sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.testing.dynamictable.controller.Main", {
            onInit: function () {

                var data = {
                    "dropdown": [
                        { "name": "Categories" },
                        { "name": "Employees" }
                    ]
                    , "rowData": {
                        "Categories": [
                            {
                                "CategoryID": 1,
                                "CategoryName": "Beverages",
                                "Description": "Soft drinks, coffees, teas, beers, and ales"
                            },
                            {
                                "CategoryID": 2,
                                "CategoryName": "Condiments",
                                "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
                            },
                            {
                                "CategoryID": 3,
                                "CategoryName": "Confections",
                                "Description": "Desserts, candies, and sweet breads"
                            },
                            {
                                "CategoryID": 4,
                                "CategoryName": "Dairy Products",
                                "Description": "Cheeses"
                            },
                            {
                                "CategoryID": 5,
                                "CategoryName": "Grains/Cereals",
                                "Description": "Breads, crackers, pasta, and cereal"
                            },
                            {
                                "CategoryID": 6,
                                "CategoryName": "Meat/Poultry",
                                "Description": "Prepared meats"
                            },
                            {
                                "CategoryID": 7,
                                "CategoryName": "Produce",
                                "Description": "Dried fruit and bean curd"
                            },
                            {
                                "CategoryID": 8,
                                "CategoryName": "Seafood",
                                "Description": "Seaweed and fish"
                            }
                        ],
                        "Employees": [
                            {
                                "EmployeeID": 1,
                                "LastName": "Davolio",
                                "FirstName": "Nancy",
                                "Title": "Sales Representative",
                                "FirstName1": "Nancy",
                                "Title1": "Sales Representative",
                                "FirstName2": "Nancy",
                                "Title2": "Sales Representative",
                                "FirstName3": "Nancy",
                                "Title3": "Sales Representative",
                                "FirstName4": "Nancy",
                                "Title4": "Sales Representative",
                                "FirstName5": "Nancy",
                                "Title5": "Sales Representative",
                                "FirstName6": "Nancy",
                                "Title6": "Sales Representative"
                            },
                            {
                                "EmployeeID": 2,
                                "LastName": "Fuller",
                                "FirstName": "Andrew",
                                "Title": "Vice President, Sales",
                                "FirstName1": "Nancy",
                                "Title1": "Sales Representative",
                                "FirstName2": "Nancy",
                                "Title2": "Sales Representative"
                            },
                            {
                                "EmployeeID": 3,
                                "LastName": "Leverling",
                                "FirstName": "Janet",
                                "Title": "Sales Representative"
                            },
                            {
                                "EmployeeID": 4,
                                "LastName": "Peacock",
                                "FirstName": "Margaret",
                                "Title": "Sales Representative"
                            },
                            {
                                "EmployeeID": 5,
                                "LastName": "Buchanan",
                                "FirstName": "Steven",
                                "Title": "Sales Manager"
                            },
                            {
                                "EmployeeID": 6,
                                "LastName": "Suyama",
                                "FirstName": "Michael",
                                "Title": "Sales Representative"
                            },
                            {
                                "EmployeeID": 7,
                                "LastName": "King",
                                "FirstName": "Robert",
                                "Title": "Sales Representative",
                                "FirstName1": "Nancy",
                                "Title1": "Sales Representative",
                                "FirstName2": "Nancy",
                                "Title2": "Sales Representative"
                            },
                            {
                                "EmployeeID": 8,
                                "LastName": "Callahan",
                                "FirstName": "Laura",
                                "Title": "Inside Sales Coordinator"
                            },
                            {
                                "EmployeeID": 9,
                                "LastName": "Dodsworth",
                                "FirstName": "Anne",
                                "Title": "Sales Representative"
                            },
                            {
                                "EmployeeID": 10,
                                "LastName": "Dodsworth",
                                "FirstName": "Anne",
                                "Title": "Sales Representative"
                            },
                            {
                                "EmployeeID": 11,
                                "LastName": "Dodsworth",
                                "FirstName": "Anne",
                                "Title": "Sales Representative"
                            },
                            {
                                "EmployeeID": 12,
                                "LastName": "Dodsworth",
                                "FirstName": "Anne",
                                "Title": "Sales Representative"
                            },
                            {
                                "EmployeeID": 13,
                                "LastName": "Dodsworth",
                                "FirstName": "Anne",
                                "Title": "Sales Representative"
                            }
                        ]
                    }

                };

                var items = [];
                for(var i =0; i<=100;i++){
                    
                    items.pusyh({ "name": "Categories" });
                }


                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(data);
                this.getView().setModel(oModel, "sampleModel");

            },
            onSelectionChange: function (oEvent) {
                var selection = oEvent.getSource().getSelectedItem().getText();

                var oModel = this.getView().getModel("sampleModel");
                var temprowData = oModel.getData().rowData[selection];
                var columnData = Object.keys(oModel.getData().rowData[selection][0]);


                var rowData = [];
                temprowData.forEach(function (item) {
                    rowData.push(item);
                });

                
                // you can filter unwanted fields from here
                // var unwantedColumns = ["CategoryName"];
                // var filteredFields = rowData.filter(function(data) {
                //     debugger;
                //     !data["bing"]
                // });

                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({
                    rows: rowData,
                    columns: columnData
                });
                var oTable = this.byId("idDynamictable");
                oTable.setModel(oModel);


                oTable.bindColumns("/columns", function (sId, oContext) {
                    var columnName = oContext.getObject();
                    return new sap.ui.table.Column({
                        label: columnName,
                        template: columnName,
                        width: "auto",
                        wrapping: true
                        // autoResizeColumn: true
                    });
                });

                oTable.bindRows("/rows");
                //for autoresizing columns width
                // oTable.getColumns().map((col, index) => oTable.autoResizeColumn(index));
            },
            onItemSave: function () {
                debugger;
            },
            onItemEdit: function () {
                if (!this.onEditFrag) {
                    this.onEditFrag = sap.ui.xmlfragment("com.testing.dynamictable.view.edit", this);
                    this.getView().addDependent(this.onEditFrag);

                    //getdata
                    var selectedIndex = this.byId("idDynamictable").getSelectedIndices();
                    var item = this.byId("idDynamictable").getModel().getData().rows[selectedIndex];
                    this.obbeforefragopen(item);
                    this.onEditFrag.open();
                } else {
                    //getdata
                    var selectedIndex = this.byId("idDynamictable").getSelectedIndices();
                    var item = this.byId("idDynamictable").getModel().getData().rows[selectedIndex];
                    this.obbeforefragopen(item);
                    this.onEditFrag.open();
                }
            },

            obbeforefragopen: function (item) {
                var oForm = sap.ui.getCore().byId('SimpleFormChange354');
                // addig items
                oForm.removeAllContent();

                for (var i = 0; i < Object.keys(item).length; i++) {
                    oForm.addContent(new sap.m.Label({ text: Object.keys(item)[i] }));
                    if (Object.keys(item)[i] == "Title" || Object.keys(item)[i] == "Description") {
                        oForm.addContent(new sap.m.Input({ type: sap.m.InputType.Text, value: Object.values(item)[i], editable: true}));
                    } else {
                        oForm.addContent(new sap.m.Input({ type: sap.m.InputType.Text, value: Object.values(item)[i], editable: false}));
                    }
                }
            },

            onupdateDB: function () {
                debugger;
                //geting values
                var oForm = sap.ui.getCore().byId('SimpleFormChange354');

                var pnlDom = oForm.getDomRef()
                var lables = [];
                $(pnlDom).find('label').each(function (index, elem) {
                    lables.push($(elem).text());
                });

                var values = [];
                $(pnlDom).find('input').each(function (index, elem) {
                    values.push($(elem)[0].value);
                });

                // var payload = {};
                var tmpObj = {};
                lables.forEach(function (lable, index) {
                    tmpObj[lable] = values[index];
                })

                var payload = {
                    "id": tmpObj.CategoryID
                }
                
                // start of save
                sap.ui.core.BusyIndicator.show();
                var oToken = this.getOwnerComponent()._csrfToken;
                var sUrl = "xyzxyz/xyzxyz.xsjs ......payload-";

                $.ajax({
                    url: sUrl,
                    type: "POST",
                    data: JSON.stringify(payload),
                    dataType: "json",
                    contentType: "application/json",
                    headers: {
                        "X-CSRF-Token": oToken
                    },
                    success: function (data) {
                        // success
                        sap.ui.core.BusyIndicator.hide();
                        this.onEditFrag.close();

                    },
                    error: function (err) {
                        // error
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.error(err.statusCode);
                        this.onEditFrag.close();
                    }
                });
                //  end of save
            },
            closeDialog: function () {
                this.onEditFrag.close();
            }

        });
    });
