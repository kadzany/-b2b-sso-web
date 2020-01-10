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
                        `<div class='product-photo' style='background-image: url(https://demos.telerik.com/kendo-ui/content/web/foods/#:data.ProductID#.jpg);'></div>
                        <div casss='product-info'><small><a href='return false;' data='#:data.ProductID#'><i class='pencil alternate icon small'></i>&nbsp;Note</a></small></div>`,
                    field: "ProductName",
                    title: "Product Info",
                    width: 240 
                }, 
                {
                    field: "UnitPrice",
                    title: "Price",
                    format: "{0:c}", 
                    width: 80
                }, 
                {
                    template :
                        "<div><b>#:ProductName#</b>, a product of #:Category.Description#</div>",
                    field: "Category.Description",
                    title: "Description"
                },
                {
                    template : 
                        "<input class='numerictextbox' style='width:120px' />" ,
                    title: "Quantity",
                    width: 150
            }]            
        });

        $("#grid-editable").kendoGrid({
            dataSource: crudDataSource,
            pageable: true,
            height: 200,
            toolbar: ["create"],
            columns: [
                { selectable: true, width: "50px" },
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
                { field: "UnitsInStock", title:"Quantity", width: "120px" },
                { field: "Remark", width: "120px", editor: customBoolEditor },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "inline"
        });

        var  customBoolEditor = function(container, options) {
            var guid = kendo.guid();
            $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
            $('<label class="k-checkbox-label" for="' + guid + '">&#8203;</label>').appendTo(container);
        };

        $(".numerictextbox").kendoNumericTextBox({
            spinners: true
        });
    });
})();