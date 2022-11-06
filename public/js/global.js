$(function() {
    $(".fa-left-long").each(function () {
        $(this).on("click", function() {
            window.history.go(-1);
        });
    });
});