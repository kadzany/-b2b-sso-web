(function(){

    function showDetails(){
        window.location = "contract_list_sso.html";
    }

    $(document).ready(function () {
        $("#grid").kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                },
                pageSize: 10
            },
            sortable: true,
            toolbar: ["search"],
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            columns: [
            {
                field: "CompanyName",
                title: "Nama Vendor"
            },
            {
                command: [
                    { text: "Lihat Detail", click: showDetails },
                ],
                title: "&nbsp", 
                width: "280px"
            }
            ]
        });
    });
})();