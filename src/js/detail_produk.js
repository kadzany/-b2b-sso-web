function setBackground(id) {
    return "url(https://demos.telerik.com/kendo-ui/content/web/foods/" + id + ".jpg)";
}
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
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
    }
});



(function () {
    $(document).ready(function () {

    });
})();