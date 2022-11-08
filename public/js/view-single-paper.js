$(function() {
    $(".read-more").click(function () {
        if ($(this).parent().find(".dots").is(":hidden")) {
            $(this).parent().find(".dots").show();
            $(this).parent().find(".read-more").html("Read More");
            $(this).parent().find(".more").css("display", "none");
        } else {
            $(this).parent().find(".dots").hide();
            $(this).parent().find(".read-more").html("Read Less");
            $(this).parent().find(".more").css("display", "inline");
        }
    })

    $("#show-reviews").parent().find(".reviews").hide();

    $("#show-reviews").click(function() {
        if($(this).parent().find(".reviews").is(":hidden")){
            $(this).parent().find(".reviews").show();
            $(this).html(`<i class="fa-solid fa-caret-up"></i> <span>Hide all comments</span>`);
        } else {
            $(this).parent().find(".reviews").hide();
            $(this).html(`<i class="fa-solid fa-caret-down"></i> <span>Show all comments</span>`);
        }
        
    });
});