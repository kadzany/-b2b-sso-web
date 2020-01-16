(function(){

    function showDetails(){
        window.location = "contract_list_sso.html";
    }

    $(document).ready(function () {
        const userUrl = 'https://54.179.187.23:8443/person_logins?page=1';
        window.api.get(userUrl).then(function(res){
            if (res.data){

                let dataSource = new kendo.data.DataSource({
                    data: res.data["hydra:member"],
                    pageSizes: 10
                });

                $("#grid").kendoGrid({
                    dataSource: dataSource,
                    sortable: true,
                    groupable:true,
                    resizable: true,
                    toolbar: ["search"],
                    dataBound: function() {
                        for (var i = 0; i < this.columns.length; i++) {
                            this.autoFitColumn(i);
                        }
                    },
                    pageable: {
                        pageSizes: 10
                    },
                    columns: [
                    {
                        field: "id",
                        title: "ID"
                    },
                    {
                        field: "username",
                        title: "Username"
                    },
                    {
                        field: "activeFromDate",
                        title: "Active From Date"
                    },
                    {
                        field: "activeToDate",
                        title: "Active To Date"
                    },
                    {
                        field: "suspendedDate",
                        title: "Suspended Date"
                    },
                    {
                        field: "suspendReason",
                        title: "Suspended Reason"
                    },
                    {
                        field: "isActive",
                        title: "Status"
                    },
                    ],
                    detailTemplate: 'Products: <div class="second-level-grid"></div>',
                    detailInit: function(e) {
                        console.log(e.data.roles)
                        e.detailRow.find(".second-level-grid").kendoGrid({
                            dataSource: e.data.roles
                        })
                    }
                });
            }
        })


    });
})();