const cds = require("@sap/cds");

module.exports = class CatalogService extends cds.ApplicationService {
  async init() {
    const db = await cds.connect.to("db");
    const { Employees, TempEmployees } = this.entities;

    this.on("CREATE", Employees, async (req) => {
      const tx = db.tx(req);
      try {
        const response = await tx.run(INSERT.into(Employees).entries(req.data));
        await tx.commit();
        return response;
      } catch (e) {
        await tx.rollback();
        req.error(400, e.message);
      }
    });

    this.on("deleteAndBackup", async (req) => {
      const tx = db.tx(req);
      const { n } = req.data;
      if (!n || typeof n !== "number" || n <= 0) {
        req.error(400, "Invalid parameter 'n'. It must be a positive integer.");
        return;
      }

      try {
        const employees = await tx.run(SELECT.from(Employees));
        const tempEmployees = await tx.run(SELECT.from(TempEmployees));
        if (employees.length >= tempEmployees.length) {
          await tx.run(DELETE.from(TempEmployees));
          await tx.run(INSERT.into(TempEmployees).entries(employees));
        }
        const deletedCount = await tx.run(DELETE.from(Employees));

        const newRecords = [];
        for (let i = 1; i <= n; i++) {
          newRecords.push({
            ID: i,
            LastName: `New ${i}`,
            FirstName: `Employee ${i}`,
            Title: "Sales Representative",
            TitleOfCourtesy: "Ms.",
            BirthDate: "/Date(-664761600000)/",
            HireDate: "/Date(704678400000)/",
            Address: "507 - 20th Ave. E. Apt. 2A",
            City: "Seattle",
            Region: "WA",
            PostalCode: "98122",
            Country: "USA",
            HomePhone: "(206) 555-9857",
            Extension: "5467",
            Notes: `New employee ${i}`,
            ReportsTo: 2,
          });
        }
        await tx.run(INSERT.into(Employees).entries(newRecords));

        await tx.commit();
        return { deleted: deletedCount };
      } catch (e) {
        await tx.rollback();
        req.error(500, e.message);
      }
    });

    this.on("restoreFromBackup", async (req) => {
      const tx = db.tx(req);
      try {
        await tx.run(DELETE.from(Employees));
        const tempEmployees = await tx.run(SELECT.from(TempEmployees));
        if (tempEmployees.length) {
          await tx.run(INSERT.into(Employees).entries(tempEmployees));
        }
        await tx.run(DELETE.from(TempEmployees));
        await tx.commit();
        return { restored: tempEmployees.length };
      } catch (e) {
        await tx.rollback();
        req.error(500, e.message);
      }
    });

    return super.init();
  }
};
