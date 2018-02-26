function test(question_string) {
    var question_original = question_string;
    var question_words = question_original.split(" ");
    console.log(question_words.length);
    var timed_question = question_words[0];
    i = 0;
    var displayer = setInterval(function () {
        document.getElementById("question").innerHTML = timed_question;
        i += 1;
        var place_holder = " " + question_words[i];
        timed_question += place_holder;
        if (i == question_words.length) {
            clearInterval(displayer);
        }
    }, 125);
       
}



$(document).ready(function () {
    //next question
    $("#next_question").bind("click", function () {
        $.getJSON("/background_process", {
            type: "Next"
        },
            function (data) {
                test(data.result);
            });
        
        return false
    });


    //submit answeer
    $("#submit_answer").bind("click", function () {
        $.getJSON("/background_process", {
            type: "Answer",
            response: $("input[name='response']").val()
        },
            function (data) {
                $("#result").text(data.result);
            });
        return false
    });


    //Test
    $("#buzz").bind("click", function () {
        clearInterval(displayer);
        return false
    });


});
