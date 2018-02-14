$(document).ready(function () {
    //display question
    //check answer function
    $("#next_question").bind("click", function () {
        var question_original = document.getElementById("question").innerHTML;
        var question_words = question_original.split(" ");
        var timed_question = question_words[0];
        for (i = 1; i < question_words.length; i++) {
            var place_holder = " " + question_words[i];
            timed_question += place_holder;
            console.log(timed_question);
            document.getElementById("question").innerHTML = timed_question;
        }
        return false
    });
    
    $("#submit_answer").bind("click", function () {
        $.getJSON("/background_process", {
            response: $("input[name='response']").val(),
        },
            function (data) {
                $("#result").text(data.result);
            });
        return false
    });
});
