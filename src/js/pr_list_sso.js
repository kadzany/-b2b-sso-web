/**
 * Didnt use IIFE because it causes error when showing status
 */

function showStatus(data){
    if (data === 1){
        return "<label class='label verified'>Approved</label>";
    }
    else if (data === 2){
        return "<label class='label waiting'>Menunggu direvisi</label>";
    }
    else {
        return "<label class='label revisi'>Ditolak</label>";
    }
}

function showDetails() {
    window.location = "pr_detail_sso.html";
}

$(document).ready(function(){
    let data = [
        {
            PrNumber: 'PR001', CreatedDate:'01/01/2020', Customer: 'Telkom', Status: 'Approved', Approver: "admin SSO", FullfillmentDate: '03/01/2020'
        },
        {
            PrNumber: 'PR002', CreatedDate:'01/01/2020', Customer: 'Yakes', Status: 1, Approver: "admin SSO", FullfillmentDate: '03/01/2020'
        },
        {
            PrNumber: 'PR003', CreatedDate:'01/01/2020', Customer: 'Yakes', Status: 2, Approver: "admin SSO", FullfillmentDate: '03/01/2020'
        },
        {
            PrNumber: 'PR004', CreatedDate:'01/01/2020', Customer: 'Yakes', Status: 3, Approver: "admin SSO", FullfillmentDate: '03/01/2020'
        }
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
            field: "PrNumber",
            title: "Nomor PR",
            width: 80
        },
        {
            field: "Customer",
            title: "Customer",
        },
        {
            field: "CreatedDate",
            title: "Tanggal Dibuat"
        },
        {
            field: "FullfillmentDate",
            title: "Tanggal Dipenuhi"
        },
        {
            field: "Status",
            title: "Status",
            template:"#=showStatus(Status)#"
        },
        {
            field: "Approver",
            title: "SSO Approver"
        },
        {
            command: {
                text: "Lihat Detail",
                click: showDetails
            },
            title: "&nbsp;", 
            width: "250px"
        }
    ];

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


