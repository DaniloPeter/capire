sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel"],
  (Controller, ODataModel) => {
    "use strict";
    return Controller.extend("be.wl.serversiderendering.controller.Home", {
      oHelpDialog: null,
      oResponsibleDialog: null,

      onInit: function () {
        this._oModel = new ODataModel("mainService", {
          json: true,
          useBatch: false,
        });
        debugger;
        this.getView().setModel(this._oModel);
        this._oSmartFilterBar = this.byId("smartFilterBar");
        debugger;
      },
    });
  }
);
