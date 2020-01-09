function beliBarang(id){
    window.location = 'shopping_cart.html';
}

function lihatBarang(id){
    window.location = 'detail_produk.html';
}    

(function(){
    $(document).ready(function() {

        function onDataBound() {
            kendoConsole.log("ListView data bound");
        }
    
        function onChange() {
            var data = dataSource.view(),
                selected = $.map(this.select(), function(item) {
                    return data[$(item).index()].ProductName;
                });
    
            kendoConsole.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
        }

        const catalogUrl = 'https://apibisnis.blanja.com/api/v1/catalog/categories/40/products?limit=100&offset=8&sort=-created_at';
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