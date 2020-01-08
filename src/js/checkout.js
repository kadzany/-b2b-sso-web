(function(){
    $(document).ready(function() {
        $("#grid").kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                },
                schema:{
                    model: {
                        fields: {
                            ProductName: { type: "string" },
                            UnitPrice: { type: "number" },
                            UnitsOnOrder: { type: "number" },
                        }
                    }
                },
                aggregate: [  { field: "UnitPrice", aggregate: "sum" },
                              { field: "UnitsOnOrder", aggregate: "count" }]
            },
            sortable: false,
            scrollable: true,
            columns: [
                { field: "ProductName", title: "Nama Produk"},
                {field: "UnitPrice", title: "Harga per Unit", aggregates: ["sum"], footerTemplate: "Total Harga Barang: #=sum#", groupFooterTemplate: "Total Harga: #=sum#"  },
                { field: "UnitsOnOrder", title: "Quantity", aggregates: ["count"], footerTemplate: "Jumlah Barang: #=count#", groupFooterTemplate: "Jumlah Barang: #=count#" }
            ]
        });
    });
})();