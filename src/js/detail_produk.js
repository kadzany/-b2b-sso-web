const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function tutupLihatBarang(){
    window.location = "katalog_produk.html";
}        

function beliBarang(){
    window.location = "shopping_cart.html?prodid=" + id;
}

(function () {
    $(document).ready(function () {
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const catalogUrl = 'https://apibisnis.blanja.com/api/v1/catalog/products/' + id;
        window.api.get(catalogUrl).then(function (res) {
            if (res) {
                var dataSource = new kendo.data.DataSource({
                    data: res.data.images
                });

                $("#scrollView").kendoScrollView({
                    dataSource: dataSource,
                    template: $("#scrollview-template").html(),
                    contentHeight: "100%",
                    enablePager: false
                });

                // set the name, price, other info
                $('#vendor').html(res.data.supplier.store_name);
                $('#name').html(res.data.name);
                $('#price').html("Rp. " + numberWithCommas(res.data.max_price));
            }
        });
    });
})();