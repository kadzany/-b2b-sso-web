(function(){
    $(document).ready(function() {
        $("#grid-store-checkout").kendoGrid({
            dataSource: {
                type: "odata",
                pageSize: 3,
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
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
                aggregate: [  
                    { field: "UnitPrice", aggregate: "sum" },
                    { field: "UnitsOnOrder", aggregate: "sum"}]
            },
            sortable: false,
            scrollable:true,
            pageable: true,
            columns: [
                { 
                    field: "ProductName", 
                    title: "Nama Produk",
                    template: "<div class='product-photo'" +
                    "style='background-image: url(../img/logo.jpg);'></div>" +
                    "<div class='product-name'>#: ProductName #</div>"
                },{
                    field: "UnitPrice", 
                    title: "Harga per Unit", 
                    aggregates: ["sum"], 
                    footerTemplate: "Sub Total: #=sum#"                    
                },{
                    field: "UnitsOnOrder", 
                    title: "Quantity", 
                    aggregates: ["sum"], 
                    footerTemplate: "Jumlah Barang: #=sum#"
                }
            ]
        });

        $("#grid-request-checkout").kendoGrid({
            dataSource: {
                type: "odata",
                pageSize: 3,
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
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
                aggregate: [  
                    { field: "UnitPrice", aggregate: "sum" },
                    { field: "UnitsOnOrder", aggregate: "sum"}]
            },
            sortable: false,
            scrollable:true,
            pageable: true,
            columns: [
                { 
                    field: "Num", 
                    title: "Nomor"
                },                
                { 
                    field: "Desc", 
                    title: "Item Description",
                    template: "<div class='product-photo'" +
                    "style='background-image: url(../img/logo.jpg);'></div>" +
                    "<div class='product-name'>#: ProductName #</div>"
                },
                {
                    field: "UnitsOnOrder", 
                    title: "Quantity", 
                    aggregates: ["sum"], 
                    footerTemplate: "Jumlah Barang: #=sum#"
                },
                { 
                    field: "Unit", 
                    title: "Satuan"
                },
                {
                    field: "UnitPrice", 
                    title: "Harga per Unit", 
                    aggregates: ["sum"], 
                    footerTemplate: "Sub Total: #=sum#"                    
                },
                { 
                    field: "Remark", 
                    title: "Remark"
                },
            ]
        });
    });
})();