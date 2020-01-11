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

        var top10UpdatedBaseUrl = "https://apibisnis.blanja.com/api/v1/catalog/categories/40/products?limit=15&offset=1&sort=-updated_at";
        window.api.get(top10UpdatedBaseUrl).then(function (res) {
            if (res) {
                coverflow('player').setup({
                    flash: '/lib/coverflow.swf',
                    playlist: res.data.data.map(function (i) {
                        return {
                            title: i.name,
                            description: "",
                            image: i.images[0].url,
                            link: "/detail_produk.html?id=" + i.id,
                            duration: 150
                        };
                    }),
                    width: '100%',
                    height: 250,
                    y: -20,
                    backgroundcolor: "cccccc",
                    coverwidth: 180,
                    coverheight: 220,
                    fixedsize: true,
                    textoffset: 50,
                    textstyle: ".coverflow-text{color:#000000;text-align:center;font-family:Arial Rounded MT Bold,Arial;} .coverflow-text h1{font-size:14px;font-family:inherit;font-weight:normal;line-height:21px;} .coverflow-text h2{font-size:12px;font-family:inherit;font-weight:normal;} .coverflow-text a{color:#0000EE;}"
                }).on('ready', function() {
                    this.on('click', function(index, link) {
                        window.location = link;
                    });
                });
            }
        });

        // == the default


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