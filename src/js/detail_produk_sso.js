function lihatListProduct() {
    window.location = "contract_list_sso.html";
}

(function(){

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
            pageSize: 2
        });

        $("#pager").kendoPager({
            dataSource: dataSource
        });

        $("#listView").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#template").html())
        });
    });

})();
