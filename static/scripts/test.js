$(document).ready(function () {
    $("#sample_button").bind("click", function () {
        $.getJSON("/background_process", {
            response: $("input[name='response'").val(),
        },
            function (data) {
                $("#result").text(data.result);
            });
        return false
    });
});
