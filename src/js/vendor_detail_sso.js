$("#reviseBtn").on("click",function(){
    kendo.confirm("Are you sure that you want to revise?").then(function(){
        kendo.alert("You chose to revise it");
        window.location = "vendor_on_progress_list.html";
    }), function() {
        kendo.alert("Cancel revise");
    }
});

$("#verifyBtn").on("click",function(){
    kendo.confirm("Are you sure that you want to verify it?").then(function(){
        kendo.alert("You chose to verify it");
        window.location = "vendor_on_progress_list.html";
    }), function() {
        kendo.alert("Cancel revise");
    }
});

$(document).ready(function() {

    function onSelect() {
        var dataURI = "data:text/plain;base64,SGVsbG8gV29ybGQh";
        kendo.saveAs({
            dataURI: dataURI,
            fileName: "test.txt"
        });
    }

    $("#treeview").kendoTreeView({
        dataSource: [
            { text: "Kontrak" },
            { text: "SIUP" }
        ],
        select: onSelect       
    });
});