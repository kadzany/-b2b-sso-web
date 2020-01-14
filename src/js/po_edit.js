(function(){
    $(document).ready(function (){
        var dataSource = new kendo.data.DataSource({
            data: products,
            pageSize: 5
        });

        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";
        var crudDataSource = new kendo.data.DataSource({
            transport: {
                read:  {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
                },
                update: {
                    url: crudServiceBaseUrl + "/Products/Update",
                    dataType: "jsonp"
                },
                destroy: {
                    url: crudServiceBaseUrl + "/Products/Destroy",
                    dataType: "jsonp"
                },
                create: {
                    url: crudServiceBaseUrl + "/Products/Create",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            batch: true,
            pageSize: 10,
            schema: {
                model: {
                    id: "ProductID",
                    fields: {
                        ProductID: { editable: false, nullable: true },
                        ProductName: { validation: { required: true } },
                        UnitPrice: { type: "number", validation: { required: true, min: 1} },
                        Discontinued: { type: "boolean" },
                        UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                }
            }
        });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            height: 550,
            groupable: true,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            toolbar: [
                { template: kendo.template($("#template").html()) }
            ],
            columns: [
                { selectable: true, width: "50px" },
                {
                    template: 
                        "<div class='product-photo' style='background-image: url(https://demos.telerik.com/kendo-ui/content/web/foods/#:data.ProductID#.jpg);'></div>" +
                        "<div casss='product-info'><small><a href='return false;' data='#:data.ProductID#'><i class='pencil alternate icon small'></i>&nbsp;Note</a></small></div>",
                    field: "ProductName",
                    title: "Product Info",
                    width: 150 
                }, 
                {
                    field: "UnitPrice",
                    title: "Price",
                    format: "{0:c}", 
                    width: 80
                }, 
                {
                    template :
                        "<div><b>#:ProductName#</b><br />A product of #:Category.Description#</div>",
                    field: "Category.Description",
                    title: "Description"
                },
                {
                    title: "Quantity",
                    field: "UnitsOnOrder",
                    width: 150
            }]            
        });

        $("#grid-editable").kendoGrid({
            dataSource: crudDataSource,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            height: 260,
            toolbar: ["create"],
            columns: [
                { selectable: true, width: "50px" },
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
                { field: "UnitsInStock", title:"Quantity", width: "120px" },
                { field: "Remark", title:"Remark", width: "120px" },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "200px" }
            ],
            editable: "inline"
        });

        $("#SaveBtn").click(function (e) {
            e.preventDefault();
            window.location.replace("po_list.html");
        });
    
        $("#CancelBtn").click(function (e) {
            e.preventDefault();
            window.location.replace("po_list.html");
        });

        $(".numerictextbox").kendoNumericTextBox({
            spinners: true
        });
    });
})();