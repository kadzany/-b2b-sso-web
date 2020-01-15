function lihatListProduct() {
    window.location = "product_list_vendor_bef.html";
}

(function(){
    let myWindow = $("#window");

    myWindow.kendoWindow({
        width: "505px",
        height: "315px",
        title: "Import data sekaligus dengan Excel",
        actions: ["Close"],
        visible:false
    });

    let contract_data = [
        {
            contractNumber: '1', startedDate:'01/01/2020', contractTitle: 'Kontrak 1', endDate: '03/01/2020'
        },
        {
            contractNumber: '2', startedDate:'01/01/2020', contractTitle: 'Kontrak 2',endDate: '03/01/2020'
        },
        {
            contractNumber: '3', startedDate:'01/01/2020', contractTitle: 'Kontrak 3', endDate: '03/01/2020'
        }
    ];

    $(document).ready(function() {

        $("#no-kontrak").text(contract_data[0].contractNumber);
        $("#starteddate-kontrak").text(contract_data[0].startedDate);
        $("#judul-kontrak").text(contract_data[0].contractTitle);
        $("#enddate-kontrak").text(contract_data[0].endDate);
        $("#vendorname").text("Vendor 1");

        $("#files").kendoUpload({
            async: {
                chunkSize: 11000,// bytes
                saveUrl: "chunkSave",
                removeUrl: "remove",
                autoUpload: true
            }
        });

        $("#sso-excel").kendoUpload({
            async: {
                chunkSize: 11000,// bytes
                saveUrl: "chunkSave",
                removeUrl: "remove",
                autoUpload: true
            }
        });

        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";
        var dataSource = new kendo.data.DataSource({
            batch: true,
            transport: {
                read:  {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
                },
                create: {
                    url: crudServiceBaseUrl + "/Products/Create",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: { type: "number" },
                        ProductName: { type: "string" }
                    }
                }
            }
        });

        $("#products").kendoMultiColumnComboBox({
            filter: "startswith",
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            columns: [
                { field: "ProductName", title: "Name" },
                { field: "ProductID", title: "ID" }
            ],
            dataSource: dataSource,
            readonly:true
        });

        $("#categories").kendoMultiColumnComboBox({
            filter: "startswith",
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            columns: [
                { field: "ProductName", title: "Kategori" },
                { field: "ProductID", title: "ID" }
            ],
            dataSource: dataSource,
            readonly:true
        });

        $("#brands").kendoMultiColumnComboBox({
            filter: "startswith",
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            columns: [
                { field: "ProductName", title: "Kategori" },
                { field: "ProductID", title: "ID" }
            ],
            dataSource: dataSource,
            readonly:true
        });


        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Products",
                    dataType: "jsonp"
                }
            },
            pageSize: 5
        });

        $("#pager").kendoPager({
            dataSource: dataSource
        });

        $("#listView").kendoListView({
            dataSource: dataSource,
            selectable: "multiple",
            template: kendo.template($("#template").html())
        });
    });
})();