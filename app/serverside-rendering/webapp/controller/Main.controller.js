sap.ui.define(
  ["be/wl/serversiderendering/controller/Base", "sap/m/MessageBox"],
  (BaseController, MessageBox) => {
    "use strict";
    return BaseController.extend("be.wl.serversiderendering.controller.Home", {
      oHelpDialog: null,
      oResponsibleDialog: null,

      onInit() {
        // var oSmartTable = this.byId("smartTable");
        // oSmartTable.attachFieldChange(function (oEvent) {
        //   const oSource = oEvent.getParameter("changeEvent").getSource();
        //   const sValue = oSource.getValue(); // String value
        //   const sValuePath = oSource.getBinding("value").sPath; // имя поля
        //   const oBindingContext = oSource.getBindingContext();
        //   const oModel = oBindingContext.getModel();
        //   const sPath = oBindingContext.getPath(); // '/Employees()'
        //   debugger;
        //   oModel.setProperty(sPath + "/" + sValuePath, sValue);
        // });
      },

      async onAddButtonPress() {
        const oModel = this.getOwnerComponent().getModel();

        try {
          const oDataResponse = await new Promise((resolve, reject) => {
            oModel.read("/Employees", {
              success: function (oData) {
                resolve(oData);
              },
              error: function (oError) {
                reject(oError);
              },
            });
          });

          const existingIds = oDataResponse.results.map(
            (employee) => employee.ID
          );

          let newId = 1;
          while (existingIds.includes(newId)) {
            newId++;
          }

          const oData = {
            ID: newId,
            LastName: "Test24" + newId,
            FirstName: "Employee" + newId,
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
          // debugger;
          // const oNewEntry = oModel.createEntry("/Employees");

          // // Добавляем новое значение в oModel для редактирования
          // oModel.setProperty("LastName", ""); // Здесь вы можете задать временные значения, если нужно
          // oModel.setProperty("FirstName", "");

          oModel.create("/Employees", oData, {
            success: function (oData, oResponse) {
              sap.m.MessageBox.success(
                "Данные успешно добавлены",
                oData,
                oResponse
              );
            },
            error: function (oError) {
              sap.m.MessageBox.error(
                "Ошибка при добавлении данных: " + oError.message
              );
            },
          });
        } catch (oError) {
          sap.m.MessageBox.error(
            "Ошибка при получении данных: " + oError.message
          );
        }
      },

      async onRemoveRow() {
        const oTable = this.byId("smartTable").getTable();
        const oModel = oTable.getModel();
        const aSelectedIndices = oTable.getSelectedIndices();

        if (!aSelectedIndices.length) {
          sap.m.MessageToast.show("Выберите строки для удаления");
          return;
        }

        try {
          const aPaths = aSelectedIndices.map((iIndex) => {
            const oRow = oTable.getContextByIndex(iIndex);
            debugger;
            if (!oRow)
              throw new Error(`Контекст строки с индексом ${iIndex} не найден`);
            return oRow.getPath();
          });

          oModel.setUseBatch(true);

          const deleteRequests = aPaths.map((sPath) => {
            return new Promise((resolve, reject) => {
              oModel.remove(sPath, {
                success: resolve,
                error: reject,
              });
            });
          });

          await Promise.all(deleteRequests);
          await oModel.submitChanges();

          sap.m.MessageToast.show(`Удалено ${aPaths.length} записей`);
          oTable.getBinding("rows").refresh();
        } catch (oError) {
          console.error("Ошибка удаления:", oError);
          sap.m.MessageBox.error("Ошибка при удалении: " + oError.message);
        } finally {
          oModel.setUseBatch(false);
          oTable.removeSelections();
        }
      },

      async onEditToggled(oEvent) {
        const oIntModel = this.getInternalModel();
        const bEditMode = oIntModel.getProperty("/editMode");
        oIntModel.setProperty("/editMode", !bEditMode);

        if (!bEditMode) {
          MessageBox.show("Edit mode True");
          return;
        }

        const oTable = this.byId("smartTable").getTable();
        const oModel = oTable.getModel();
        debugger;

        if (!oModel.hasPendingChanges()) {
          sap.m.MessageBox.show("Нет изменений для сохранения");
          oIntModel.setProperty("/editMode", false);
          return;
        }

        try {
          await new Promise((resolve, reject) => {
            oModel.submitChanges({
              success: function (oData) {
                resolve(oData);
              },
              error: function (oError) {
                reject(oError);
              },
            });
          });
          sap.m.MessageBox.success("Изменения успешно сохранены");
          oTable.getBinding("rows").refresh();
        } catch (oError) {
          console.error("Ошибка сохранения:", oError);
          sap.m.MessageBox.error(
            "Ошибка при сохранении изменений: " + oError.message
          );
        } finally {
          oIntModel.setProperty("/editMode", false);
        }
      },

      async onDeleteAndAdd() {
        const oModel = this.getView().getModel();
        debugger;
        const oSlider = this.byId("rangeSlider");
        const oSliderValues = oSlider.getRange();
        const n = oSliderValues[0];

        try {
          const response = await new Promise((resolve, reject) => {
            oModel.callFunction("/deleteAndBackup", {
              method: "POST",
              success: resolve,
              error: reject,
            });
          });

          const deletedCount = response.deleteAndBackup.deleted;
          let addedCount = 0;

          for (let i = 1; i <= n; i++) {
            const oData = {
              ID: i,
              LastName: "New " + i,
              FirstName: "Employee " + i,
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
              Notes: "New employee " + i,
              ReportsTo: 2,
            };

            await new Promise((resolve, reject) => {
              oModel.create("/Employees", oData, {
                success: () => {
                  addedCount++;
                  resolve();
                },
                error: (err) => reject(err),
              });
            });
          }
          this.byId("smartTable").getTable().getBinding("rows").refresh();
          MessageBox.show(
            `Deleted ${deletedCount} records. Added ${addedCount} new records.`
          );
        } catch (error) {
          MessageBox.show("Error: " + error.message);
        }
      },

      async onRestoreAll() {
        const oModel = this.getView().getModel();
        try {
          const response = await new Promise((resolve, reject) => {
            oModel.callFunction("/restoreFromBackup", {
              method: "POST",
              success: resolve,
              error: reject,
            });
          });
          const restoredCount = response.restoreFromBackup.restored;
          debugger;
          MessageBox.show(`Restored ${restoredCount} records`);
        } catch (error) {
          MessageBox.show("Error: " + error.message);
        }
      },
    });
  }
);
