$(function () {
    $("select").on("change", function () {
        $("select").not($(this)).prop("disabled", true);
    });

    $(".fa-angles-left, .fa-angles-right").on("click", function () {
        $("select option:selected").each(function() {
            $("select").not($(this).parent()).append($(this));
        });
        
        $("select option:selected").prop("selected", false);
        $("select").prop("disabled", false);
    });

    $("#allocate-reviewers").submit(function (e) {
        e.preventDefault();
        const all_selected = []
        $("select[name='temp-allocated'] option").each(function () {
            all_selected.push($(this).val());
        });
        $("input[name='selected'").val(all_selected);
        e.currentTarget.submit();
    });

});