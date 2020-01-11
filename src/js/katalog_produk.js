function lihatBarang(id) {
    window.location = 'detail_produk.html?id=' + id;
}

function lihatCart() {
    let id = $('#productIdHiddenInput').val();
    window.location = 'shopping_cart.html?prodid=' + id;
}

function beliBarang(id) {
    $(document).ready(function () {
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        const catalogUrl = 'https://apibisnis.blanja.com/api/v1/catalog/products/' + id;
        window.api.get(catalogUrl).then(function (res) {
            if (res) {
                $('#productIdHiddenInput').val(res.data.id);
                $('#popUpVendor').html(res.data.supplier.store_name);
                $('#popUpName').html(res.data.name);
                $('#popUpPrice').html("Rp. " + numberWithCommas(res.data.max_price));
                $('#popUpImg').attr("src", res.data.images[0].url);                
            }
        });

        function onClose() {
            return;
        }

        $("#window").kendoWindow({
            width: "600px",
            title: "Produk berhasil ditambahkan ke dalam keranjang.",
            visible: false,
            actions: [
                "Close"
            ],
            close: onClose
        }).data("kendoWindow").center().open();
    });
}

(function () {
    $(document).ready(function () {

        function onDataBound() {
            console.log("ListView data bound");
        }

        function onChange() {
            var data = dataSource.view(),
                selected = $.map(this.select(), function (item) {
                    return data[$(item).index()].ProductName;
                });

            console.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
        }

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const catalogUrl = 'https://apibisnis.blanja.com/api/v1/catalog/categories/40/products?limit=100&offset=1&sort=-created_at';
        window.api.get(catalogUrl).then(function (res) {
            if (res && res.data && res.data.data) {
                var dataSource = new kendo.data.DataSource({
                    data: res.data.data.map(function (m) {
                        m.max_price = numberWithCommas(m.max_price);
                        return m;
                    }),
                    pageSize: 12
                });

                $("#pager").kendoPager({
                    dataSource: dataSource
                });

                $("#listView").kendoListView({
                    dataSource: dataSource,
                    dataBound: onDataBound,
                    change: onChange,
                    template: kendo.template($("#productTemplate").html())
                });
            }
        });
    });
})();