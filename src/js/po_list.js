(function(){
    $(document).ready(function(){

        /**
         * variables for showing list of POs
        */

        let po_data = [
            {
                poNumber: 'PO1', createdDate:'01/01/2020', customer: 'Telkom', status: 'Approved', approver: "admin SSO", fullfillmentDate: '03/01/2020',
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

        let po_schema = {
            model: {
                poNumber : {type: "string"},
                createdDate: {type: "string"},
                customer: {type: "string"},
                status: {type: "string"}
            }
        };

        let po_columns = [
            {
                field: "poNumber",
                title: "Nomor PO"
            },
            {
                field: "createdDate",
                title: "Tanggal PO dibuat"
            },
            {
                field: "customer",
                title: "Customer"
            },
            {
                field: "status",
                title: "Status"
            },
            {
                command: {
                    text: "View Details",
                    click: showDetails
                },
                title: "&nbsp;", 
                width: "250px"
            }
        ];

        $("#grid-po-list").kendoGrid({
            dataSource: {
                data: po_data,
                schema: po_schema,
                pageSize: 20
            },
            pageble: true,
            editable: false,
            sortable: true,
            scrollable: true,
            columns: po_columns
        });



        function showDetails(e) {
            e.preventDefault();
            window.location.replace("detail_po.html");
        }

        
 });
})();