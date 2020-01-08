(function(){
    $(document).ready(function () {
        $("#cart-catalog").kendoGrid({
            dataSource: {
                batch: true,
                type: "odata-v4",
                transport: {
                    read: {
                        url: function () {
                            return "https://demos.telerik.com/kendo-ui/service-v4/odata/Products";
                        }
                    },
                    update: {
                        url: function (dataItem) {
                            return "https://demos.telerik.com/kendo-ui/service-v4/odata/Products(" + dataItem.ProductID + ")";
                        }
                    },
                    batch: {
                        url: function () {
                            return "https://demos.telerik.com/kendo-ui/service-v4/odata/$batch";
                        }
                    },
                    create: {
                        url: function (dataItem) {
                            delete dataItem.ProductID;
                            return "https://demos.telerik.com/kendo-ui/service-v4/odata/Products";
                        }
                    },
                    destroy: {
                        url: function (dataItem) {
                            return "https://demos.telerik.com/kendo-ui/service-v4/odata/Products(" + dataItem.ProductID + ")";
                        }
                    }
                },
                schema: {
                    model: {
                        id: "ProductID",
                        fields: {
                            ProductID: { editable: false },
                            ProductName: { editable: false },
                            UnitPrice: { type: "number", editable: false },
                            UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                        }
                    }
                },
                pageSize: 20
            },
            navigatable: true,
            pageable: true,
            height: 550,
            // toolbar: ["create", "save", "cancel"],
            columns: [
                { selectable: true, width: "50px" },
                {
                    template: "<div class='product-photo'" +
                    "style='background-image: url(../content/web/Products/#:data.ProductID#.jpg);'></div>" +
                    "<div class='product-name'>#: ProductName #</div>",
                    field: "ProductName",
                    title: "Product Name",
                    width: 240
                },
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
                { field: "UnitsInStock", title: "Units In Stock", width: 120 },
                { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true
        });
    });

    function customBoolEditor(container, options) {
        var guid = kendo.guid();
        $('<label class="k-checkbox-label" for="' + guid + '">&#8203;</label>').appendTo(container);
    }
})();