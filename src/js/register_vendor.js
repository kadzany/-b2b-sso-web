function lihatListProduct() {
    window.location = "product_list_vendor_bef.html";
}

$(document).ready(function() {

    $("#files").kendoUpload({
        async: {
            chunkSize: 11000,// bytes
            saveUrl: "chunkSave",
            removeUrl: "remove",
            autoUpload: true
        }
    });

});