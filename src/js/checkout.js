(function(){
    $(document).ready(function() {
        let data = [
            { productName: "QUESO CABRALES", unitPrice: 1000, qty: 5 },
            { productName: "ALICE MUTTON", unitPrice: 2000, qty: 7 },
            { productName: "GENEN SHOUYU", unitPrice: 3000, qty: 3 },
            { productName: "CHARTREUSE VERTE", unitPrice: 4000, qty: 1 }
        ];
        let schema = {
            model: {
                productName: { type: "string" },
                unitPrice: { type: "number"},
                qty: { type: "number" }
            },
            parse: function (data) {
                $.each(data, function () {
                    this.total = this.qty * this.unitPrice;
                });
                return data;
            }
        };
        let aggregate = [
            { field: "qty", aggregate: "sum" },
            { field: "unitPrice", aggregate: "sum" },
            { field: "total", aggregate: "sum" }
        ];
        let columns = [
            { 
                field: "productName", 
                title: "Nama Produk",
                template: "<div class='product-photo'" +
                "style='background-image: url(../img/logo.jpg);'></div>" +
                "<div class='product-name'>#: productName #</div>",
                footerTemplate: "Total"
            },{
                field: "unitPrice", 
                title: "Harga per Unit", 
                aggregates: ["sum"], 
                footerTemplate: "#=sum#"                    
            },{
                field: "qty", 
                title: "Quantity", 
                aggregates: ["sum"], 
                footerTemplate: "Jumlah Barang: #=sum#"
            },{
                field: "total",
                title: "Total",
                aggregates: ["sum"],
                footerTemplate: "Total: #=sum#"
            }
        ];

        $("#grid-store-checkout").kendoGrid({
            dataSource: {
                data: data,
                aggregate: aggregate,
                schema: schema
            },
            editable:false,
            sortable: false,
            scrollable:true,
            columns: columns
        });

        $("#grid-request-checkout").kendoGrid({
            dataSource: {
                data: data,
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
            columns: [
                { 
                    field: "Num", 
                    title: "Nomor"
                },                
                { 
                    field: "productName", 
                    title: "Item Description",
                    template: "<div class='product-photo'" +
                    "style='background-image: url(../img/logo.jpg);'></div>" +
                    "<div class='product-name'>#: productName #</div>"
                },
                {
                    field: "qty", 
                    title: "Quantity", 
                    aggregates: ["sum"], 
                    footerTemplate: "Jumlah Barang: #=sum#"
                },
                { 
                    field: "Unit", 
                    title: "Satuan"
                },
                {
                    field: "unitPrice", 
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