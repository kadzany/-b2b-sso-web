function lihatListProduct() {
    window.location = "product_list_vendor_bef.html";
}

$(document).ready(function() {

    $("#files").kendoUpload({
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

    $("#company_type").kendoMultiColumnComboBox({
        filter: "startswith",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        columns: [
            { field: "ProductName", title: "Name" },
            { field: "ProductID", title: "ID" }
        ],
        dataSource: dataSource,
        noDataTemplate: $("#noDataTemplate").html()
    });

    $("#bidang_usaha").kendoMultiColumnComboBox({
        filter: "startswith",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        columns: [
            { field: "ProductName", title: "Bidang Usaha" },
            { field: "ProductID", title: "ID" }
        ],
        dataSource: dataSource,
        noDataTemplate: $("#noDataTemplate").html()
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
        noDataTemplate: $("#noDataTemplate").html()
    });
});