(function(){
    $(document).ready(function() {

        let data = [
            { productName: "QUESO CABRALES", unitPrice: 1000, qty: 5,uom:'kg', remark:"Budget maksimal Rp 3.000.000,00" },
            { productName: "ALICE MUTTON", unitPrice: 2000, qty: 7,uom:'kg',remark:"Budget maksimal Rp 3.000.000,00" },
            { productName: "GENEN SHOUYU", unitPrice: 3000, qty: 3,uom:'kg',remark:"Budget maksimal Rp 3.000.000,00" },
            { productName: "CHARTREUSE VERTE", unitPrice: 4000, qty: 1,uom:'kg',remark:"Budget maksimal Rp 3.000.000,00" }
        ];

        let dataSource = new kendo.data.DataSource({
            data: data,
        });

        $("#listView-store-checkout").kendoListView({
            dataSource: dataSource,
            scrollable:"true",
            template: kendo.template($("#template").html())
        });

        let subTotal = function(data){
            let total = 0;
            data.forEach(function (arrayItem){
                total += arrayItem.qty * arrayItem.unitPrice;
            })

            return total;
        }

        let sumOrder = function(data){
            let sum = 0;
            data.forEach(function (arrayItem){
                sum += arrayItem.qty;
            })

            return sum;
        }

        let subTotalStore = subTotal(data);
        let sumOrderStore = sumOrder(data);

        $("#subtotal-store").text(subTotalStore);

        $("#sum-order-store").text(sumOrderStore);

        let request_schema = {
            model: {
                num : {type:"number"},
                productName: { type: "string" },
                uom: { type: "string"},
                qty: { type: "number" },
                unitPrice: { type: "number"},
                remark: {type: "string"}         
            },
            parse: function (data) {
                $.each(data, function (i) {
                    this.num = i+1;
                });
                return data;
            }
        }

        let request_columns = [
            { 
                field: "num", 
                title: "Nomor",
                width: 80
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
                title: "Quantity"
            },
            { 
                field: "uom", 
                title: "Satuan"
            },
            {
                field: "unitPrice", 
                title: "Harga per Unit"
            },
            { 
                field: "remark", 
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
        let sumOrderRequest = sumOrder(data);

        $("#subtotal-request").text(subTotalRequest);

        $("#sum-order-request").text(sumOrderRequest);

        let totalPrice = function(subtotal_store,subtotal_request){
            return subtotal_store + subtotal_request;
        }

        $("#totalPrice").text(totalPrice(subTotalStore,subTotalRequest));

        let totalUnit = function(sum_unit_store,sum_unit_request){
            return sum_unit_store + sum_unit_request;
        }

        $("#totalUnit").text(totalUnit(sumOrderStore,sumOrderRequest));

    });
})();