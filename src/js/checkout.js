var lihatInvoice = function() {
    window.location = "cetak_invoice.html";
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var subTotal = function (data) {
    var total = 0;
    data.forEach(function (arrayItem) {
        total += arrayItem.Quantity * arrayItem.UnitPrice;
    });

    return total;
};

var sumOrder = function (data) {
    var sum = 0;
    data.forEach(function (arrayItem) {
        sum += arrayItem.Quantity;
    });
    return sum;
};


(function () {
    $(document).ready(function () {
        //var serviceBaseUrl = "https://apibisnis.blanja.com/api/v1/catalog/categories/40/products?limit=5&offset=1&sort=-max_price";
        var prodArray = JSON.parse(window.sessionStorage.getItem("shopping_cart"));
        if(!prodArray) prodArray = { data: [] };
        prodArray.data.forEach(el => {
            el.max_price = numberWithCommas(el.max_price);
        });
        var DataSource = new kendo.data.DataSource({
            // transport: {
            //     read: {
            //         url: serviceBaseUrl,
            //         dataType: "json"
            //     }
            // },            
            // batch: true,
            data: prodArray,
            pageSize: 10,
            schema: {
                data: "data"
            }
        });

        var procurementArray = JSON.parse(window.sessionStorage.getItem("shopping_cart_procurement"));
        if(!procurementArray) procurementArray = [];

        // var StaticDataSource = [
        //     { productName: "QUESO CABRALES", unitPrice: 1000, qty: 5, uom: 'kg', remark: "Budget maksimal Rp 3.000.000,00" },
        //     { productName: "ALICE MUTTON", unitPrice: 2000, qty: 7, uom: 'kg', remark: "Budget maksimal Rp 3.000.000,00" },
        //     { productName: "GENEN SHOUYU", unitPrice: 3000, qty: 3, uom: 'kg', remark: "Budget maksimal Rp 3.000.000,00" },
        //     { productName: "CHARTREUSE VERTE", unitPrice: 4000, qty: 1, uom: 'kg', remark: "Budget maksimal Rp 3.000.000,00" }
        // ];

        var StaticDataSource = procurementArray;

        $("#StoreCheckoutListView").kendoListView({
            dataSource: DataSource,
            scrollable: "true",
            template: kendo.template($("#template").html())
        });


        $("#subtotal-store").text(subTotal(StaticDataSource));
        $("#sum-order-store").text(sumOrder(StaticDataSource));

        // let request_schema = {
        //     model: {
        //         num: { type: "number" },
        //         productName: { type: "string" },
        //         uom: { type: "string" },
        //         qty: { type: "number" },
        //         unitPrice: { type: "number" },
        //         remark: { type: "string" }
        //     },
        //     parse: function (data) {
        //         $.each(data, function (i) {
        //             this.num = i + 1;
        //         });
        //         return data;
        //     }
        // };

        let request_schema = {
            model: {
                ProductName: "",
                UnitPrice: "",
                Uom: "",
                Quantity: 0,
                Remark: ""
            }
        };        

        let request_columns = [
            {
                field: "num",
                title: "Nomor",
                width: 80
            },
            {
                field: "ProductName",
                title: "Item Description",
                template: 
                    "<!--<div class='product-photo'style='background-image: url(../img/logo.jpg);'></div>-->" +
                    "<div class='product-name'>#: ProductName #</div>"
            },
            {
                field: "Quantity",
                title: "Quantity"
            },
            {
                field: "UnitPrice",
                title: "Harga per Unit"
            },
            {
                field: "Uom",
                title: "UOM"
            },
            {
                field: "Remark",
                title: "Remark"
            }
        ];

        $("#grid-request-checkout").kendoGrid({
            dataSource: {
                data: StaticDataSource,
                schema: request_schema
            },
            editable: false,
            sortable: false,
            scrollable: true,
            columns: request_columns
        });

        $("#subtotal-request").text(subTotal(StaticDataSource));
        $("#sum-order-request").text(sumOrder(StaticDataSource));

        var totalPrice = function (subtotal_store, subtotal_request) {
            return subtotal_store + subtotal_request;
        };
        $("#totalPrice").text(totalPrice(subTotal(StaticDataSource), subTotal(StaticDataSource)));
        
        var totalUnit = function (sum_unit_store, sum_unit_request) {
            return sum_unit_store + sum_unit_request;
        };
        $("#totalUnit").text(totalUnit(sumOrder(StaticDataSource), sumOrder(StaticDataSource)));

    });
})();