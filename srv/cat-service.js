const cds = require("@sap/cds");

module.exports = class CatalogService extends cds.ApplicationService {
  async init() {
    const db = await cds.connect.to("db");
    const { Employees } = this.entities;

    this.before("CREATE", Employees, async (req) => {
      const data = req.data;
      if (data.ID === 0) req.error(400, "ID must be specified");
    });
    this.before("UPDATE", Employees, async (req) => {
      console.log("Before UPDATE Employees", req.data);
    });

    this.on("CREATE", Employees, async (req) => {
      const tx = db.tx(req);
      return await tx.run(INSERT.into(Employees).entries(req.data));
    });

    return super.init();
  }
};
