(function(){
    $(document).ready(function() {
        var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "https://demos.telerik.com/kendo-ui/service/Products",
                        dataType: "jsonp"
                    }
                },
                pageSize: 15
            });
    
        $("#pager").kendoPager({
            dataSource: dataSource
        });
    
        $("#listView").kendoListView({
            dataSource: dataSource,
            selectable: "multiple",
            dataBound: onDataBound,
            change: onChange,
            template: kendo.template($("#template").html())
        });
    
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
    });
})();