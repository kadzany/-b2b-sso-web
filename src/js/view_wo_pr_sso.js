function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function reviewPr(){
    window.location = "edit_wo_pr_sso.html";
}

$(document).ready(function () {
    let po_data = [
        {
            poNumber: 'PO1', createdDate: '01/01/2020', customer: 'Telkom', status: 'Approved', approver: "Admin SSO", fullfillmentDate: '03/01/2020',
            poFromStore: [
                { productName: "ASUS VivoBook S330FA Intel i3-8145U 4GB 256GB SSD FHD 13.3", unitPrice: 7799000, qty: 4,uom:'buah', remark:"Budget maksimal Rp 30.000.000,00", purchaseRequest: "WO"},
                { productName: 'Macbook Pro 2019 13" inch 512GB 8GB - MV972 Grey MV9A2 Silver 512', unitPrice: 27070000, qty: 1,uom:'buah',remark:"Budget maksimal Rp 30.000.000,00" ,purchaseRequest: "WO"},
                { productName: "Vetto Stop Kontak Ms3 Tanpa Kabel (Tk)", unitPrice: 79200, qty: 3,uom:'buah',remark:"Budget maksimal Rp 300.000,00",purchaseRequest: "WO" },
                { productName: "Vetto Box Kabel V8816 / 10m Switch + Turbo Sni", unitPrice: 155400, qty: 10,uom:'buah',remark:"Budget maksimal Rp 2.000.000,00",purchaseRequest: "WO"}
            ],
            poRequest:[
                { productName: "Printer HP Laser MFP 137fnw", unitPrice: 2500000, qty: 5,uom:'unit', remark:"Warna hitam semua", purchaseRequest: "Procurement"},
                { productName: "Tissue Paseo Smart 250", unitPrice: 5000, qty: 100,uom:'box', remark:"Tissue Toilet", purchaseRequest: "Procurement"}
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
            purchaseRequest: { type: "string" }
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
            title: "Purchase Request"
        }
    ];

    $("#grid-store-checkout").kendoGrid({
        dataSource: {
            data: po_data[0].poFromStore,
            schema: request_schema
        },
        dataBound: function() {
            for (var i = 0; i < this.columns.length; i++) {
              this.autoFitColumn(i);
            }
        },
        editable: false,
        sortable: false,
        scrollable: true,
        columns: request_columns
    });

    $("#grid-request-checkout").kendoGrid({
        dataSource: {
            data: po_data[0].poRequest,
            schema: request_schema
        },
        dataBound: function() {
            for (var i = 0; i < this.columns.length; i++) {
              this.autoFitColumn(i);
            }
        },
        editable: false,
        sortable: false,
        scrollable: true,
        columns: request_columns
    });

    $("#requester").text(po_data[0].customer);
    $("#approver").text(po_data[0].approver);
    $("#req-date").text(po_data[0].createdDate);
    $("#fullfill-date").text(po_data[0].fullfillmentDate);

});