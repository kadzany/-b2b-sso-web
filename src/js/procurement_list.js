(function(){
    $(document).ready(function(){

        /**
         * variables for showing list of POs
        */

        var procurement = [
            {
                ProcurementNumber: 'PR001', CreatedDate:'01/01/2020', Customer: 'PT Sinar Abadi', Status: 'Approved', Approver: "admin SSO", FullfillmentDate: '03/01/2020',
                poFromStore:[
                    { productName: "QUESO CABRALES", unitPrice: 1000, qty: 5,uom:'kg', remark:"Budget maksimal Rp 3.000.000,00" },
                    { productName: "ALICE MUTTON", unitPrice: 2000, qty: 7,uom:'kg',remark:"Budget maksimal Rp 3.000.000,00" },
                    { productName: "GENEN SHOUYU", unitPrice: 3000, qty: 3,uom:'kg',remark:"Budget maksimal Rp 3.000.000,00" },
                    { productName: "CHARTREUSE VERTE", unitPrice: 4000, qty: 1,uom:'kg',remark:"Budget maksimal Rp 3.000.000,00" }
                ]
            },
            {
                ProcurementNumber: 'PR002', CreatedDate:'01/01/2020', Customer: 'PT Dedi Jaya', Status: 'Rejected', Approver: "admin SSO", FullfillmentDate: '03/01/2020'
            },
            {
                ProcurementNumber: 'PR003', CreatedDate:'01/01/2020', Customer: 'PT Dedi Jaya', Status: 'Assigned', Approver: "admin SSO", FullfillmentDate: '03/01/2020'
            },
            {
                ProcurementNumber: 'PR004', CreatedDate:'01/01/2020', Customer: 'PT Harapan Indah', Status: 'Assigned', Approver: "admin SSO", FullfillmentDate: '03/01/2020'
            }
        ];

        var procurement_schema = {
            model: {
                procurementNumber : {type: "string"},
                createdDate: {type: "string"},
                customer: {type: "string"},
                status: {type: "string"}
            }
        };

        $("#grid-procurement-list").kendoGrid({
            dataSource: {
                data: procurement,
                schema: procurement_schema,
                pageSize: 20
            },
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            sortable: true,
            scrollable: true,
            columns: [
                {
                    field: "ProcurementNumber",
                    title: "Nomor Procurement"
                },
                {
                    field: "CreatedDate",
                    title: "Tanggal Procurement dibuat"
                },
                {
                    field: "Customer",
                    title: "Vendor Procurement"
                },
                {
                    field: "Status",
                    title: "Status"
                },
                {
                    command: [
                        { text: "View Details", click: showDetails }
                    ],
                    title: "Action", 
                    width: "280px"
                }
            ],
            dataBound: function() {
                for (var i = 0; i < this.columns.length; i++) {
                  this.autoFitColumn(i);
                }
            }
        });

        function showDetails(e) {
            e.preventDefault();
            window.location.replace("procurement_detail.html");
        }       
        
 });
})();