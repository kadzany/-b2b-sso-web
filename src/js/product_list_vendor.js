/**
 * Didnt use IIFE because it causes error when showing status
 */

function showStatus(data){
    if (data === 1){
        return "<label class='label verified'>Approved</label>";
    }
    else if (data === 2){
        return "<label class='label waiting'>Menunggu direview</label>";
    }
    else if(data === 3){
        return "<label class='label revisi'>Perlu direvisi</label>";
    }
    else{
        return "<label class='label not-submitted'>Belum disubmit</label>";
    }
}

function lihatKatalog() {
    window.location = "katalog_produk.html";
}

$(document).ready(function(){
    let data = [
        { productName: "QUESO CABRALES", unitPrice: 1000, qty: 5, uom: 'kg', status: 1 },
        { productName: "ALICE MUTTON", unitPrice: 2000, qty: 7, uom: 'kg', status: 2 },
        { productName: "GENEN SHOUYU", unitPrice: 3000, qty: 3, uom: 'kg', status: 3},
        { productName: "CHARTREUSE VERTE", unitPrice: 4000, qty: 1, uom: 'kg', status: 1 }
    ];

    let products_schema = {
        model: {
            num: { type: "number" },
            productName: { type: "string" },
            qty: { type: "number" },
            unitPrice: { type: "number" },
            status: { type: "number" }
        },
        parse: function (data) {
            $.each(data, function (i) {
                this.num = i + 1;
            });
            return data;
        }
    };

    let products_columns = [
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
            field: "unitPrice",
            title: "Harga per Unit"
        },
        {
            field: "status",
            title: "Status",
            template:"#=showStatus(status)#"
        },
        {
            command: {
                text: "Preview",
                click: showDetails
            },
            title: "&nbsp;", 
            width: "250px"
        }
    ];

    function showDetails(e) {
        e.preventDefault();
        window.location.replace("input_produk_vendor.html");
    }

    $("#grid-products").kendoGrid({
        dataSource: {
            data: data,
            schema: products_schema
        },
        editable: false,
        sortable: false,
        scrollable: true,
        columns: products_columns,
        dataBound: function() {
            for (var i = 0; i < this.columns.length; i++) {
            this.autoFitColumn(i);
            }
        }
    });


});


