function checkout() {
    window.location = "checkout.html";
}

(function () {
    $(document).ready(function () {
        // commented, later must retrieve from the shopping cart
        // var serviceBaseUrl = "https://apibisnis.blanja.com/api/v1/catalog/categories/40/products?limit=5&offset=1&sort=-max_price";
        var prodArray = JSON.parse(window.sessionStorage.getItem("shopping_cart"));
        if (!prodArray) prodArray = { data: [] };
        var DataSource = new kendo.data.DataSource({
            // transport: {
            //     read: {
            //         url: serviceBaseUrl,
            //         dataType: "json"
            //     }
            // },
            // batch: true,
            data: prodArray,
            pageSize: 10,
            schema: {
                data: "data"
            }
        });

        var procurementArray = JSON.parse(window.sessionStorage.getItem("shopping_cart_procurement"));
        if(!procurementArray) procurementArray = [];
        var CrudDataSource = procurementArray;

        var CrudSchema = {
            model: {
                ProductName: "",
                UnitPrice: "",
                Quantity: 0,
                Remark: ""
            }
        };

        $(".ShowNote").click(function (e) {
            e.preventDefault();

            $("#NoteTemplate").kendoWindow({
                width: "600px",
                title: "Tambahkan Catatan.",
                visible: false,
                actions: [
                    "Close"
                ],
                close: onClose
            }).data("kendoWindow").center().open();
        });

        $("#grid").kendoGrid({
            dataSource: DataSource,
            height: 550,
            groupable: false,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            columns: [
                { selectable: true, width: "50px" },
                {
                    template:
                        `<div class='product-photo' style='float: left; margin-right: 15px;'>                            
                            <img src="#:images[0].url#"/>
                        </div>
                         <div casss='product-info'>
                            <p>#:supplier.store_name#</p>
                            <h3>#:name#</h3>
                            <small><a class='ShowNote' href='' data='#:id#'><i class='pencil alternate icon small'></i>&nbsp;Note</a></small>
                         </div>`,
                    field: "name",
                    title: "Product Info",
                    width: 440
                },
                {
                    field: "max_price",
                    title: "Price",
                    format: "Rp. {0:#,##}",
                    width: 180
                },
                {
                    template:
                        "<div>#:unit#</div>",
                    field: "unit",
                    title: "UOM"
                },
                {
                    template:
                        "<input class='numerictextbox' style='width:120px' />",
                    title: "Quantity",
                    width: 150
                }],
            dataBound: function () {
                // this.tbody.find(".numerictextbox").each(function () {
                //     $(this).kendoNumericTextBox();
                // });
            }
        });

        $("#grid-editable").kendoGrid({
            dataSource: {
                data: CrudDataSource,
                schema: CrudSchema,
                pageSize: 20
            },
            pageable: true,
            height: 200,
            toolbar: ["create"],
            columns: [
                { selectable: true, width: "50px" },
                { field: "ProductName", title: "Product Name", width: "120px" },
                { field: "UnitPrice", title: "Unit Price", width: "120px" },
                { field: "Quantity", title: "Quantity", width: "120px" },
                { field: "Remark", width: "120px" },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "inline",
            save: function (e) {
                var procurementArray = JSON.parse(window.sessionStorage.getItem("shopping_cart_procurement"));
                if(!procurementArray) procurementArray = [];
                if(!e.model.id){
                    procurementArray.push(e.model);
                }                
                window.sessionStorage.setItem("shopping_cart_procurement", JSON.stringify(procurementArray));
            }
        });

        $(".numerictextbox").kendoNumericTextBox({
            spinners: true
        });
    });
})();