sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";
  return Controller.extend("be.wl.serversiderendering.controller.Home", {
    oHelpDialog: null,
    oResponsibleDialog: null,

    onInit: async function () {
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
  });
});
