    $(document).ready(function () {
        const productCatalogListUrl = 'https://apibisnis.blanja.com/api/v1/catalog/categories/40/products?limit=8&offset=8&sort=-created_at';
        window.parent.api.get(productCatalogListUrl).then(function (res) {
            if (res && res.data && res.data.data) {
                var dataSource = new kendo.data.DataSource({
                    data: res.data.data,
                    pageSize: 20
                });
    
                $("#listView").kendoListView({
                    dataSource: dataSource,
                    template: kendo.template($("#productTemplate").html())
                });

                $('.product').click(function () {
                    console.log('tes');
                    window.parent.location = '/home.html?view=product';
                });
            }
        });

    });