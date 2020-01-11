(function(){
    $(document).ready(function () {
        let serviceBaseUrl = "https://apibisnis.blanja.com/api/v1/catalog/products?limit=4&offset=16&sort=-created_at";
        let cartDataSource = {
            transport: {
                read: {
                    url: function () {
                        return '';
                    },
                    dataType: "json"
                }
            },
            schema: {
                data: "data"
            }
        };

        $("#cart-request").kendoGrid({
            dataSource: cartDataSource,
            navigatable: true,
            pageable: true,
            height: 550,
            // toolbar: ["create", "save", "cancel"],
            toolbar: ["create", "save"],
            columns: [
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
                { field: "UnitsInStock", title: "Units In Stock", width: 120 },
                // { field: "Discontinued", width: 120, editor: customBoolEditor },
                { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true
        });
    });

    function customBoolEditor(container, options) {
        var guid = kendo.guid();
        $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
        $('<label class="k-checkbox-label" for="' + guid + '">&#8203;</label>').appendTo(container);
    }
})();