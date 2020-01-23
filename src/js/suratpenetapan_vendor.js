function back(){
    window.location="vendor_on_progress_list.html";
}

$(document).ready(function () {
    // create DateTimePicker from input HTML element
    $("#datetimepicker").kendoDatePicker({
        value: new Date(),
        format: "dd/mm/yyyy",
        dateInput: true
    });
});