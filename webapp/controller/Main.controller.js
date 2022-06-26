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
                    , "rowData": {"Categories": [
                        {   "CategoryID": 1,
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
                        {   "EmployeeID": 1,
                            "LastName": "Davolio",
                            "FirstName": "Nancy",
                            "Title": "Sales Representative"
                        },
                        {
                            "EmployeeID": 2,
                            "LastName": "Fuller",
                            "FirstName": "Andrew",
                            "Title": "Vice President, Sales"
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
                            "Title": "Sales Representative"
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
                        }
                    ]
                }

                };


                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(data);
                this.getView().setModel(oModel,"sampleModel");

            },
            onSelectionChange: function (oEvent) {
                var selection = oEvent.getSource().getSelectedItem().getText();

                var oModel = this.getView().getModel("sampleModel");
                var temprowData = oModel.getData().rowData[selection];
                var columnData = Object.keys(oModel.getData().rowData[selection][0]);


                var rowData = [];
                temprowData.forEach(function(item){ 
                    rowData.push(item);
                });
                 var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({
                rows: rowData,
                columns: columnData
                });
                var oTable = this.byId("idDynamictable");
                oTable.setModel(oModel);


                oTable.bindColumns("/columns", function(sId, oContext) {
                    var columnName = oContext.getObject();
                    return new sap.ui.table.Column({
                        label: columnName,
                        template: columnName
                    });
                });

                oTable.bindRows("/rows");
            },
            onItemSave: function(){
                debugger;
            },
            onItemEdit: function(){
                if (!this.onEditFrag) {
                    this.onEditFrag = sap.ui.xmlfragment("com.testing.dynamictable.view.edit",this);
                    this.getView().addDependent(this.onEditFrag);

                //getdata
                var selectedIndex = this.byId("idDynamictable").getSelectedIndices();
                var item = this.byId("idDynamictable").getModel().getData().rows[selectedIndex];
                this.obbeforefragopen(item);
                this.onEditFrag.open();
            }else{
                //getdata
                var selectedIndex = this.byId("idDynamictable").getSelectedIndices();
                var item = this.byId("idDynamictable").getModel().getData().rows[selectedIndex];
                this.obbeforefragopen(item);
                this.onEditFrag.open();
            }
        },

        obbeforefragopen: function(item){
            var oForm = sap.ui.getCore().byId('SimpleFormChange354');        
            // addig items
            oForm.removeAllContent();

                for(var i= 0 ;i< Object.keys(item).length; i++){
                    oForm.addContent( new sap.m.Label({ text: Object.keys(item)[i] }) );
                    if(Object.keys(item)[i] == "Title" || Object.keys(item)[i] == "Description"){
                        oForm.addContent( new sap.m.Input({ type: sap.m.InputType.Text, value: Object.values(item)[i],editable: true }) );        
                        }else{
                            oForm.addContent( new sap.m.Input({ type: sap.m.InputType.Text, value: Object.values(item)[i],editable: false }) );        
                    } 
                }
            },

            onupdateDB: function(){
                debugger;
                this.onEditFrag.close();
            },
            closeDialog: function(){
                this.onEditFrag.close();
            }

        });
    });
