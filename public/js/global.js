$(function() {
    $(".fa-left-long").each(() => {
        $(this).on("click", () => {
            window.history.go(-1);
        });
    });

    $("#search").keyup(function () {
        var value = $(this).val().toLowerCase();
        $("#searchTable").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});