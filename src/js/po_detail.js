function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$(document).ready(function () {

    let po_data = [
        {
            poNumber: 'PO1', createdDate: '01/01/2020', customer: 'Telkom', status: 'Approved', approver: "Admin SSO", fullfillmentDate: '03/01/2020',
            poFromStore: [
                { productName: "ASUS VivoBook S330FA Intel i3-8145U 4GB 256GB SSD FHD 13.3", unitPrice: 7799000, qty: 5,uom:'buah', remark:"Budget maksimal Rp 3.000.000,00" },
                { productName: 'Macbook Pro 2019 13" inch 512GB 8GB - MV972 Grey MV9A2 Silver 512', unitPrice: 27070000, qty: 1,uom:'buah',remark:"Budget maksimal Rp 3.000.000,00" },
                { productName: "Vetto Stop Kontak Ms3 Tanpa Kabel (Tk)", unitPrice: 79200, qty: 3,uom:'buah',remark:"Budget maksimal Rp 3.000.000,00" },
                { productName: "Vetto Box Kabel V8816 / 10m Switch + Turbo Sni", unitPrice: 155400, qty: 10,uom:'buah',remark:"Budget maksimal Rp 3.000.000,00" }
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
            remark: { type: "string" }
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
            title: "Item Description",
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

    $("#requester").text(po_data[0].customer);
    $("#approver").text(po_data[0].approver);
    $("#req-date").text(po_data[0].createdDate);
    $("#fullfill-date").text(po_data[0].fullfillmentDate);

    var editor = $("#editor").kendoEditor()
            .data("kendoEditor");

    var dialog = $("#editorDialog").kendoDialog({
        width: "500px",
        title: "Catatan Persetujuan",
        visible: false,
        actions: [
            { text: 'Approve', primary: true, action: updateText },
            { text: 'Cancel' }
        ],
        open: function () {
        editor.refresh();
        }
    }).data("kendoDialog");

    $("#OpenBtn").click(function () {
        dialog.open();
    });

    $("#BackBtn").click(function (e) {
        e.preventDefault();
        window.location.replace("po_list.html");
    });

    function updateText() {
        $("#content").html(editor.value());
    }
});