sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";
  return Controller.extend("be.wl.serversiderendering.controller.Home", {
    oHelpDialog: null,
    oResponsibleDialog: null,

    async onInit() {
      const oModel = this.getOwnerComponent().getModel();

      const oResponse = await new Promise((resolve, reject) => {
        oModel.read("/Employees(2)", {
          success: function (oData, oResponse) {
            resolve(oData);
          },
          error: function (oError) {
            reject(oError);
          },
        });
      });
      this._oSmartFilterBar = this.byId("smartFilterBar");
    },

    async onAddButtonPress() {
      const oModel = this.getOwnerComponent().getModel();
      const oData = {
        LastName: "Test24",
        FirstName: "Employee",
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
        Notes:
          'Education includes a BA in psychology from Colorado State University in 1970. She also completed "The Art of the Cold Call." Nancy is a member of Toastmasters International.',
        ReportsTo: 2,
      };

      const oResponse = await new Promise((resolve, reject) => {
        oModel.create("/Employees", oData, {
          success: function (oData, oResponse) {
            resolve(oData);
          },
          error: function (oError) {
            reject(oError);
          },
        });
      });
    },

    async onDeleteButtonPress() {
      const oModel = this.getOwnerComponent().getModel();
      const oTable = this.byId("smartTable");
      // const oSelectedItem = oTable.getSelectedItem();
      // if (oSelectedItem) {
      //   const oContext = oSelectedItem.getBindingContext();
      //   const oData = oContext.getObject();
      const oResponse = await new Promise((resolve, reject) => {
        oModel.remove("/Employees(2)", {
          success: function () {
            resolve();
          },
          error: function (oError) {
            reject(oError);
          },
        });
      });

      oTable.refresh();
    },

    onEditToggled(oEvent) {
      const bEditMode = oEvent.getParameter("editable"); // true, если редактирование включено, false — если выключено
      const oTable = this.byId("smartTable");
      const aItems = oTable.getItems();
      debugger;
    },
  });
});
