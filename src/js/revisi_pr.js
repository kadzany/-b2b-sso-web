(function(){
    $(document).ready(function () {
        $("#chat").kendoChat({
            messages:{
                placeholder: "Tuliskan komentar anda di sini..."
            },
            toolClick: function (ev) {
                if (ev.name === "sendimage"){
                    $("#files").click();
                }
            },
            post: function(args){
                
            }
        }).data("kendoChat");

    });

}());