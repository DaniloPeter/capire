sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";
  return Controller.extend("be.wl.serversiderendering.controller.Base", {
    getInternalModel() {
      return this.getView().getModel("internalDataSource");
    },
    getAppModel() {
      return this.getView().getModel("appDataSource");
    },
  });
});
