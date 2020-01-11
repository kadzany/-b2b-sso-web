(function () {
    $(document).ready(function () {
        let serviceBaseUrl = "https://apibisnis.blanja.com/api/v1/catalog/products?limit=4&offset=16&sort=-created_at";
        let cartDataSource = {
            transport: {
                read: {
                    url: function () {
                        return serviceBaseUrl;
                    },
                    dataType: "json"
                }
            },
            schema: {
                data: "data"
            }
        };

        $("#cart-catalog").kendoGrid({
            dataSource: cartDataSource,
            navigatable: true,
            pageable: true,
            height: 550,
            // toolbar: ["create", "save", "cancel"],
            columns: [
                { selectable: true, width: "50px" },
                {
                    template: "<div class='product-photo'" +
                        "style='background-image: url(#:images[0].url#);'></div>" +
                        "<div class='product-name'>#: name #</div>",
                    field: "name",
                    title: "Product Name",
                    width: 240
                },
                { field: "max_price", title: "Unit Price", format: "Rp. {0:#,##}", width: 120 },
                { field: "stock", title: "Units In Stock", width: 120 },
                { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true
        });
    });
})();

function customBoolEditor(container, options) {
    var guid = kendo.guid();
    $('<label class="k-checkbox-label" for="' + guid + '">&#8203;</label>').appendTo(container);
}