$(function() {
    $(".fa-left-long").each(function() {
        $(this).on("click", function() {
            window.history.go(-1);
        });
    });

    $("#search").keyup(function () {
        var value = $(this).val().toLowerCase();
        $(".searchTable").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    $("#searchList").keyup(function () {
        var value = $(this).val().toLowerCase();
        $(".searchTableList *").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    $("form[action='/logout'] i").click(function() {
        $(this).parent().submit();
    })
});