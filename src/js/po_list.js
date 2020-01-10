(function(){
    $(document).ready(function (){
        var dataSource = new kendo.data.DataSource({
            data: products,
            pageSize: 5
        });

        function multiply(a, b)
        {
            return a * b;
        }

        $("#grid").kendoGrid({
            dataSource: dataSource,
            height: 550,
            pageable: false,
            columns: [
                {
                    template: 
                        `<div class='product-container'>
                        <div class='product-photo' style='background-image: url(https://demos.telerik.com/kendo-ui/content/web/foods/#:data.ProductID#.jpg);'></div>
                        <div calss='product-info'>
                        <span class='product-name'>#:ProductName#</span><br /><span class='category'>#:Category.CategoryName#</span>
                        <p>Quantity : #:UnitsOnOrder# <br/>Unit Price : #:kendo.toString(UnitPrice, 'c')#</p>
                        <p>Total : <span class='red'>#:kendo.toString((UnitPrice * UnitsOnOrder), 'c')#</span></p>
                        </div>
                        </div>`,
                    field: "ProductName",
                    title: "Product Info",
                    width: 240 
                }
                ]            
        });
    });
})();