(function () {
    $(document).ready(function () {

        //window.location = "/katalog_produk.html";
        if (userRole === "vendor"){
            $("#register_alert").html(
                "<h4>Klik menu  <a href='register_vendor.html'>register vendor</a> jika anda belum terdaftar sebagai vendor di sistem</h4>"
            );
        }
    });
})();