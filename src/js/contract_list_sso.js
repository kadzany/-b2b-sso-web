(function(){
    $(document).ready(function(){

        /**
         * variables for showing list of contracts
        */

        let contract_data = [
            {
                contractNumber: '1', vendorId:1,startedDate:'01/01/2020', contractTitle: 'Kontrak 1', endDate: '03/01/2020'
            },
            {
                contractNumber: '2', vendorId:2,startedDate:'01/01/2020', contractTitle: 'Kontrak 2',endDate: '03/01/2020'
            },
            {
                contractNumber: '3',vendorId:3, startedDate:'01/01/2020', contractTitle: 'Kontrak 3', endDate: '03/01/2020'
            }
        ];

        let contract_schema = {
            model: {
                contractNumber : {type: "string"},
                startedDate: {type: "string"},
                vendorId:{type:"number"},
                contractTitle: {type: "string"},
                endDate: {type: "string"}
            }
        };

        let contract_columns = [
            {
                field: "contractNumber",
                title: "No. Kontrak"
            },
            {
                field: "contractTitle",
                title: "Nama Kontrak"
            },
            {
                field: "vendorId",
                title: "ID Vendor"
            },
            {
                field: "startedDate",
                title: "Tanggal Mulai"
            },
            {
                field: "endDate",
                title: "Tanggal Berakhir"
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

        $("#grid-contract-list").kendoGrid({
            dataSource: {
                data: contract_data,
                schema: contract_schema,
                pageSize: 20
            },
            pageble: true,
            editable: false,
            sortable: true,
            scrollable: true,
            columns: contract_columns
        });



        function showDetails(e) {
            e.preventDefault();
            window.location.replace("detail_produk_sso.html");
        }

        
 });
})();