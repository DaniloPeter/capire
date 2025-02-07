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
      try {
        await tx.run(DELETE.from(TempEmployees));
        const employees = await tx.run(SELECT.from(Employees));
        if (employees.length) {
          await tx.run(INSERT.into(TempEmployees).entries(employees));
        }
        const deleted = await tx.run(DELETE.from(Employees));
        await tx.commit();
        return { deleted: deleted };
      } catch (e) {
        await tx.rollback();
        req.error(500, e.message);
      }
    });

    // this.on("restoreFromBackup", async (req) => {
    //   const tx = db.tx(req);
    //   try {
    //     await tx.run(DELETE.from("my.testapp.Employees"));
    //     const tempEmployees = await tx.run(
    //       SELECT.from("my.testapp.TempEmployees")
    //     );
    //     if (tempEmployees.length) {
    //       await tx.run(
    //         INSERT.into("my.testapp.Employees").entries(tempEmployees)
    //       );
    //     }
    //     await tx.run(DELETE.from("my.testapp.TempEmployees"));
    //     await tx.commit();
    //     return { restored: tempEmployees.length };
    //   } catch (e) {
    //     await tx.rollback();
    //     req.error(500, e.message);
    //   }
    // });

    return super.init();
  }
};
