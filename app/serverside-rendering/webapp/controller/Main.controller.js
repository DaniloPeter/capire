sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";
  return Controller.extend("be.wl.serversiderendering.controller.Home", {
    oHelpDialog: null,
    oResponsibleDialog: null,

    async onInit() {},

    async onAddButtonPress() {
      const oModel = this.getOwnerComponent().getModel();
      const oData = {
        ID: 159,
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

      try {
        const oResponse = await oModel.create("/Employees", oData);
        console.log(`ID: ${oResponse.ID}`);
      } catch (oError) {
        console.error(`${oError.message}`);
      }
    },

    async onDeleteButtonPress() {
      const oModel = this.getOwnerComponent().getModel();
      const oTable = this.byId("smartTable");
      // const oSelectedItem = oTable.getSelectedItem();
      // if (oSelectedItem) {
      //   const oContext = oSelectedItem.getBindingContext();
      //   const oData = oContext.getObject();
      const oResponse = await new Promise((resolve, reject) => {
        oModel.remove("/Employees(3)", {
          success: function () {
            resolve();
          },
          error: function (oError) {
            reject(oError);
          },
        });
      });
    },

    async onEditToggled(oEvent) {
      const oModel = this.getOwnerComponent().getModel();

      // Данные для обновления
      const oData = {
        LastName: "UpdatedLastName",
        FirstName: "UpdatedFirstName",
        Title: "UpdatedTitle",
        // Добавьте другие поля, которые нужно обновить
      };

      // ID сотрудника, которого нужно обновить
      const sEmployeeId = "4"; // Замените на актуальный ID

      try {
        const oResponse = await new Promise((resolve, reject) => {
          oModel.update(`/Employees(${sEmployeeId})`, oData, {
            success: function (oData, oResponse) {
              resolve(oData);
            },
            error: function (oError) {
              reject(oError);
            },
          });
        });

        // Обработка успешного обновления
        sap.m.MessageBox.success("Данные успешно обновлены");
      } catch (oError) {
        // Обработка ошибки
        sap.m.MessageBox.error(
          "Ошибка при обновлении данных: " + oError.message
        );
      }
    },
  });
});
