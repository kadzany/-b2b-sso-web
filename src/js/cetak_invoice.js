(function(){

    function getPDF(selector) {
        kendo.drawing.drawDOM($(selector)).then(function (group) {
            kendo.drawing.pdf.saveAs(group, "Invoice.pdf");
        });
    }
    
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
                unitPrice: { type: "number", editable: false },
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
        { field: "total", aggregate: "sum" }
        ];

        let columns = [
        { field: "productName", title: "Product", footerTemplate: "Total" },
        { field: "unitPrice", title: "Price", width: 90 },
        { field: "qty", title: "Pcs.", width: 90, aggregates: ["sum"], footerTemplate: "#=sum#" },
        { field: "total", title: "Total", width: 100, aggregates: ["sum"], footerTemplate: "#=sum#" }
        ];

        $("#grid-invoice").kendoGrid({
            editable: false,
            sortable: true,
            dataSource: {
                data: data,
                aggregate: aggregate,
                schema: schema,
            },
            columns: columns
        });
    });
})();