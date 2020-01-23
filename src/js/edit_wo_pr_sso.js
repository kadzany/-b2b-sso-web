function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function reviewPr(){
    window.location = "edit_wo_pr_sso.html";
} 

function openWindow(){

    let link = "./recommendation_katalog_produk.html";
    let myWindow = $("#window");

    if (!myWindow.data("kendoWindow")){
        myWindow.kendoWindow({
            iframe: true,
            content: link,
            width:700,
            height:500,
        });
    } else {
        myWindow.data("kendoWindow")
            .content("Loading...")
            .refresh(link)
            .open()
            .center();
    }

    var grid = $("#grid-store-checkout").data("kendoGrid");
    grid.setOptions({
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit
    });

    var grid_procurement = $("#grid-request-checkout").data("kendoGrid");
    grid_procurement.setOptions({
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit
    });
}

function detailInit(e) {
    var detailRow = e.detailRow;
    var example_data = [
        { productName: 'LAPTOP ASUS A409FJ-EK551T i5-8265U/4GB DDR4/512GB SSD/2GB MX230-Win10', unitPrice: 8390000, link: "https://www.blanja.com/katalog/p/com/laptop-asus-a409fj-ek551t-i5-8265u-4gb-ddr4-512gb-ssd-2gb-mx230-win10-26507413"},
        { productName: "Macbook Pro MUHN2 13inch Touchbar 2019 Ssd 128gb Space Grey", unitPrice: 17838300, link:"https://www.blanja.com/katalog/p/com/macbook-pro-muhn2-13inch-touchbar-2019-ssd-128gb-space-grey-25063208"},
    ];

    detailRow.kendoGrid({
        dataSource: {
            data: example_data
        },
        columns: [
            {
                field: "productName",
                title: "Rekomendasi Item",
                width: "600px"
            },
            {
                field: "unitPrice",
                title: "Harga per Unit",
                width: "300px"
            },
            {
                field: "link",
                title: "Link",
                width: "300px",
                template: '<a href="#:link#">#= link#</a>'
            }
        ],
        resizable: true,
        dataBound: function() {
            for (var i = 0; i < this.columns.length; i++) {
              this.autoFitColumn(i);
            }
        },
    });
}

$(document).ready(function () {
    let purchase_request = [{
            "id": 1,
            "text": "WO"
        },
        {
            "id": 2,
            "text": "Procurement"
        }
    ];

    let po_data = [
        {
            poNumber: 'PO1', createdDate: '01/01/2020', customer: 'Telkom', status: 'Approved', approver: "Admin SSO", fullfillmentDate: '03/01/2020',
            poFromStore: [
                { productName: "ASUS VivoBook S330FA Intel i3-8145U 4GB 256GB SSD FHD 13.3", unitPrice: 7799000, qty: 4,uom:'buah', remark:"Budget maksimal Rp 30.000.000,00",purchaseRequest: 1},
                { productName: 'Macbook Pro 2019 13" inch 512GB 8GB - MV972 Grey MV9A2 Silver 512', unitPrice: 27070000, qty: 1,uom:'buah',remark:"Budget maksimal Rp 30.000.000,00",purchaseRequest: 1},
                { productName: "Vetto Stop Kontak Ms3 Tanpa Kabel (Tk)", unitPrice: 79200, qty: 3,uom:'buah',remark:"Budget maksimal Rp 300.000,00",purchaseRequest: 1},
                { productName: "Vetto Box Kabel V8816 / 10m Switch + Turbo Sni", unitPrice: 155400, qty: 10,uom:'buah',remark:"Budget maksimal Rp 2.000.000,00",purchaseRequest: 1}
            ],
            poRequest:[
                { productName: "Printer HP Laser MFP 137fnw", unitPrice: 2500000, qty: 5,uom:'unit', remark:"Warna hitam semua",purchaseRequest: 2},
                { productName: "Tissue Paseo Smart 250", unitPrice: 5000, qty: 100,uom:'box', remark:"Tissue Toilet",purchaseRequest: 2}
            ]
        },
        {
            poNumber: 'PO2', createdDate: '01/01/2020', customer: 'Yakes', status: 'Rejected', approver: "admin SSO", fullfillmentDate: '03/01/2020'
        },
        {
            poNumber: 'PO3', createdDate: '01/01/2020', customer: 'Yakes', status: 'Requested', approver: "admin SSO", fullfillmentDate: '03/01/2020'
        }
    ];

    let request_schema = {
        model: {
            num: { type: "number" },
            productName: { type: "string" },
            uom: { type: "string" },
            qty: { type: "number" },
            unitPrice: { type: "number" },
            remark: { type: "string" },
            purchaseRequest: { type: "number" }
        },
        parse: function (data) {
            $.each(data, function (i) {
                this.num = i + 1;
            });
            return data;
        }
    };

    let request_columns = [
        {
            field: "num",
            title: "Nomor",
            width: 80
        },
        {
            field: "productName",
            title: "Item",
            template:"<div style='display:grid'>#=productName# <button onclick = 'openWindow()' class='k-button'>Rekomendasikan produk lain</button><div id='window'></div></div>"
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
            title: "Harga per Unit",
            template: "Rp #=numberWithCommas(unitPrice)#"
        },
        {
            field: "remark",
            title: "Remark"
        },
        {
            field: "purchaseRequest",
            title: "Purchase Request",
            template: templateFunction,
            editable: true,
            defaultValue: 1
        },

    ];


    $("#grid-store-checkout").kendoGrid({
        dataSource: {
            data: po_data[0].poFromStore,
            schema: request_schema
        },
        editable: false,
        sortable: false,
        scrollable: true,
        resizable: true,
        dataBound: function() {
            for (var i = 0; i < this.columns.length; i++) {
              this.autoFitColumn(i);
            }
        },
        columns: request_columns
    });

    $("#grid-request-checkout").kendoGrid({
        dataSource: {
            data: po_data[0].poRequest,
            schema: request_schema
        },
        editable: false,
        sortable: false,
        resizable: true,
        scrollable: true,
        dataBound: function() {
            for (var i = 0; i < this.columns.length; i++) {
              this.autoFitColumn(i);
            }
        },
        columns: request_columns
    });

    $("#requester").text(po_data[0].customer);
    $("#approver").text(po_data[0].approver);
    $("#req-date").text(po_data[0].createdDate);
    $("#fullfill-date").text(po_data[0].fullfillmentDate);

    function templateFunction(dataItem) {
        var cell = "";
        var pr = dataItem.purchaseRequest - 1;

        for (var i = 0; i < purchase_request.length; i++) {
            var item = "";

            item += "<label>"
            if (pr === i) {
                item += "<input type='radio' name='" + dataItem.uid + "' onclick='setDataItem(this);' checked=checked />";
            } else {
                item += "<input type='radio' name='" + dataItem.uid + "' onclick='setDataItem(this);'/>";
            }
            item += purchase_request[i].text;
            item += "</label>"
            item += "</br>";

            cell += item;
        }
        return cell;
    };

    function setDataItem(item) {
        var grid = $("#grid").data("kendoGrid");
        var row = $(item).closest("tr");
        var dataItem = grid.dataItem(row);
        var pr = $(item)[0].labels[0].innerText;
        var ID;

        for (var i = 0; i < purchase_request.length; i++) {
            if (purchase_request[i].text === pr) {
                ID = i;
                break;
            }
        };

        dataItem.set("purchaseRequest", ID + 1);
    };
});