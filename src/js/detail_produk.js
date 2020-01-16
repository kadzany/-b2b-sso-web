const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function tutupLihatBarang(){
    window.location = "katalog_produk.html";
}        

function beliBarang(){
    $(document).ready(function () {
        function onClose (){
            return;
        }

        $("#Window").kendoWindow({
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

function lihatCart(){
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
                $('#description').html(res.data.description);
                $('#price').html("Rp. " + numberWithCommas(res.data.max_price));
                
                // also set for the popup confirmatin window
                $('#popUpVendor').html(res.data.supplier.store_name);
                $('#popUpName').html(res.data.name);
                $('#popUpPrice').html("Rp. " + numberWithCommas(res.data.max_price));
                $('#popUpImg').attr("src", res.data.images[0].url);

                // set the array in the sessionStorage
                var prodArray = JSON.parse(window.sessionStorage.getItem("shopping_cart"));
                if(!prodArray) prodArray = {data: []};
                prodArray.data.push(res.data);
                window.sessionStorage.setItem("shopping_cart", JSON.stringify(prodArray));
            }
        });
    });
})();