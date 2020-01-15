(function () {
    $(document).ready(function () {

        var userEmail = sessionStorage.getItem('user_email');
        var userRole = sessionStorage.getItem('user_role');

        console.log(userEmail);
        console.log(userRole);

        $(".item_menu").hide();

        if(userRole == "admin"){
            $("#vendor").show();
            $("#katalog").show();
            $("#purchasing").show();
            $("#shopping_cart").show();
            $("#kontrak").show();
        }
        else if(userRole == "vendor"){
            $("#kontrak").show();
            $("#vendor").show();
            $("#katalog").show();
        }
        else if(userRole == "customer"){
            $("#katalog").show();
            $("#purchasing").show();
            $("#shopping_cart").show();
        }

        //window.location = "/katalog_produk.html";
    });
})();