function checkout(){
    window.location = "checkout.html";
}

(function(){
    $(document).ready(function (){
        var serviceBaseUrl = "https://apibisnis.blanja.com/api/v1/catalog/categories/40/products?limit=5&offset=1&sort=-max_price";
        var crudDataSource = new kendo.data.DataSource({
            transport: {
                read:  {
                    url:serviceBaseUrl,
                    dataType: "json"
                }
            },
            batch: true,
            pageSize: 10,
            schema: {
                data: "data"
            }
        });

        $("#grid").kendoGrid({
            dataSource: crudDataSource,
            height: 550,
            groupable: false,
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
                        `<div class='product-photo'><img src="#:images[0].url#"/></div>
                         <div casss='product-info'><small><a href='return false;' data='#:id#'><i class='pencil alternate icon small'></i>&nbsp;Note</a></small></div>`,
                    field: "name",
                    title: "Product Info",
                    width: 240 
                }, 
                {
                    field: "max_price",
                    title: "Price",
                    format: "{0:c}", 
                    width: 80
                }, 
                {
                    template :
                        "<div>#:unit#</div>",
                    field: "unit",
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
            dataSource: null,
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