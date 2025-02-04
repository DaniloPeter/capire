const cds = require("@sap/cds");

module.exports = class CatalogService extends cds.ApplicationService {
  async init() {
    const db = await cds.connect.to("db");
    const { Employees } = this.entities;

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

    return super.init();
  }
};
