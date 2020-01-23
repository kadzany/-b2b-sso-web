function lihatListProduct() {
    window.location = "product_list_vendor_bef.html";
    data = $("#kontrakForm").serializeJSON();
    console.log(data);
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