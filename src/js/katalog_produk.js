function beliBarang(id){
    window.location = 'shopping_cart.html?id=' + id;
}

function lihatBarang(id){
    window.location = 'detail_produk.html?id=' + id;
}    

(function(){
    $(document).ready(function() {

        function onDataBound() {
            console.log("ListView data bound");
        }
    
        function onChange() {
            var data = dataSource.view(),
                selected = $.map(this.select(), function(item) {
                    return data[$(item).index()].ProductName;
                });
    
            console.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
        }

        const catalogUrl = 'https://apibisnis.blanja.com/api/v1/catalog/categories/40/products?limit=10&offset=1&sort=-created_at';
        window.api.get(catalogUrl).then(function (res) {
            if (res && res.data && res.data.data) {
                var dataSource = new kendo.data.DataSource({
                    data: res.data.data,
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