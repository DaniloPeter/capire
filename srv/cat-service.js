const cds = require("@sap/cds");

module.exports = class CatalogService extends cds.ApplicationService {
  async init() {
    const db = await cds.connect.to("db");
    // connect to database service
    const { Employees } = db.entities;

    this.on("CREATE", async (req) => {
      const employees = req.data;
      console.log(employees);
    });
    return super.init();
  }
};
