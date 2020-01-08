(function(){
    $(document).ready(function () {
        $("#primaryTextButton").kendoButton();

        $("#textButton").kendoButton();

        $("#primaryDisabledButton").kendoButton({
            enable: false
        });

        $("#disabledButton").kendoButton({
            enable: false
        });

        $("#iconTextButton").kendoButton({
            icon: "filter"
        });

        $("#kendoIconTextButton").kendoButton({
            icon: "filter-clear"
        });

        $("#iconButton").kendoButton({
            icon: "refresh"
        });
    });
})();