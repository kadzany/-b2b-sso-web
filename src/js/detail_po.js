(function(){    
    $(document).ready(function() {

        let po_data = [
            {
                poNumber: 'PO1', createdDate:'01/01/2020', customer: 'Telkom', status: 'Approved', approver: "Admin SSO", fullfillmentDate: '03/01/2020',
                poFromStore:[
                    { productName: "QUESO CABRALES", unitPrice: 1000, qty: 5,uom:'kg', remark:"Budget maksimal Rp 3.000.000,00" },
                    { productName: "ALICE MUTTON", unitPrice: 2000, qty: 7,uom:'kg',remark:"Budget maksimal Rp 3.000.000,00" },
                    { productName: "GENEN SHOUYU", unitPrice: 3000, qty: 3,uom:'kg',remark:"Budget maksimal Rp 3.000.000,00" },
                    { productName: "CHARTREUSE VERTE", unitPrice: 4000, qty: 1,uom:'kg',remark:"Budget maksimal Rp 3.000.000,00" }
                ]
            },
            {
                poNumber: 'PO2', createdDate:'01/01/2020', customer: 'Yakes', status: 'Rejected', approver: "admin SSO", fullfillmentDate: '03/01/2020'
            },
            {
                poNumber: 'PO3', createdDate:'01/01/2020', customer: 'Yakes', status: 'Requested', approver: "admin SSO", fullfillmentDate: '03/01/2020'
            }
        ];

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
                title: "Harga per Unit"
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
            editable: false,
            sortable: false,
            scrollable:true,
            columns: request_columns
        });

        $("#grid-request-checkout").kendoGrid({
            dataSource: {
                data: po_data[0].poFromStore,
                schema: request_schema
            },
            editable: false,
            sortable: false,
            scrollable:true,
            columns: request_columns
        });

        // let editor = $("#editor").kendoEditor().data("kendoEditor");

        let dialog = $("#editorDialog").kendoDialog({
            width: "500px",
            title: "Approve Purchase Order",
            closable: true,
            modal: false,
            content: "<h3>Masukkan catatan</h3>",
            actions: [
                { text: 'Setujui', primary: true},
                { text: 'Batalkan'}
            ],
            open: function(){
                editor.refresh();
            }
        });
    
        $("#approveBtn").click(function(){
            dialog.open();
        });
    
        function updateText(){
            $("#content").html(editor.value());
        };

        $("#requester").text(po_data[0].customer);
        $("#approver").text(po_data[0].approver);
        $("#req-date").text(po_data[0].createdDate);
        $("#fullfill-date").text(po_data[0].fullfillmentDate);

    });
})();