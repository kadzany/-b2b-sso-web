(function(){    

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

    $(document).ready(function() {

        // var serviceBaseUrl = "https://apibisnis.blanja.com/api/v1/catalog/categories/40/products?limit=5&offset=1&sort=-max_price";
        var prodArray = JSON.parse(window.sessionStorage.getItem("shopping_cart"));
        if(!prodArray) prodArray = { data: [] };
        var DataSource = new kendo.data.DataSource({
            // transport: {
            //     read: {
            //         url: serviceBaseUrl,
            //         dataType: "json"
            //     }
            // },
            data: prodArray,
            batch: true,
            pageSize: 10,
            schema: {
                data: "data"
            }
        });

        var procurementArray = JSON.parse(window.sessionStorage.getItem("shopping_cart_procurement"));
        if(!procurementArray) procurementArray = [];


        // let data = [
        //     { productName: "QUESO CABRALES", unitPrice: 1000, qty: 5,uom:'kg', remark:"Budget maksimal Rp 3.000.000,00" },
        //     { productName: "ALICE MUTTON", unitPrice: 2000, qty: 7,uom:'kg',remark:"Budget maksimal Rp 3.000.000,00" },
        //     { productName: "GENEN SHOUYU", unitPrice: 3000, qty: 3,uom:'kg',remark:"Budget maksimal Rp 3.000.000,00" },
        //     { productName: "CHARTREUSE VERTE", unitPrice: 4000, qty: 1,uom:'kg',remark:"Budget maksimal Rp 3.000.000,00" }
        // ];

        let data = procurementArray;

        let dataSource = new kendo.data.DataSource({
            data: data,
        });

        $("#listView-store-checkout").kendoListView({
            dataSource: DataSource,
            scrollable:"true",
            template: kendo.template($("#template").html())
        });

        let subTotalStore = subTotal(data);
        $("#subtotal-store").text(subTotalStore);

        let sumOrderStore = sumOrder(data);
        $("#sum-order-store").text(sumOrderStore);

        // let request_schema = {
        //     model: {
        //         num : {type:"number"},
        //         productName: { type: "string" },
        //         uom: { type: "string"},
        //         qty: { type: "number" },
        //         unitPrice: { type: "number"},
        //         remark: {type: "string"}         
        //     },
        //     parse: function (data) {
        //         $.each(data, function (i) {
        //             this.num = i+1;
        //         });
        //         return data;
        //     }
        // };

        let request_schema = {
            model: {
                ProductName: "",
                UnitPrice: "",
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
                    "<!-- <div class='product-photo'style='background-image: url(../img/logo.jpg);'></div> -->" +
                    "<div class='product-name'>#: ProductName #</div>"
            },
            {
                field: "Quantity", 
                title: "Quantity"
            },
            // { 
            //     field: "uom", 
            //     title: "Satuan"
            // },
            {
                field: "UnitPrice", 
                title: "Harga per Unit"
            },
            { 
                field: "Remark", 
                title: "Remark"
            }
        ];

        $("#grid-request-checkout").kendoGrid({
            dataSource: {
                data: data,
                schema: request_schema
            },
            editable: false,
            sortable: false,
            scrollable:true,
            columns: request_columns
        });

        let subTotalRequest = subTotal(data);
        $("#subtotal-request").text(subTotalRequest);

        let sumOrderRequest = sumOrder(data);
        $("#sum-order-request").text(sumOrderRequest);

        let totalPrice = function(subtotal_store,subtotal_request){
            return subtotal_store + subtotal_request;
        };
        $("#totalPrice").text(totalPrice(subTotalStore,subTotalRequest));

        let totalUnit = function(sum_unit_store,sum_unit_request){
            return sum_unit_store + sum_unit_request;
        };
        $("#totalUnit").text(totalUnit(sumOrderStore,sumOrderRequest));
    });
})();