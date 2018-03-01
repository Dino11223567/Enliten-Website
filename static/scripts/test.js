

function show(interval,question_string) {
    var timerId, index = 0;
    var state = 0; //0 = idle, 1= running , 2 = paused, 3 = resumed 
    var test_words = question_string.split(" ");
    var test_display = test_words[index];
    

    this.start = function () {

        if (state != 0) return;
       
        timerId = window.setInterval(function () {
            document.getElementById("question").innerHTML = test_display;
            index += 1;
            test_display += " " + test_words[index];
            if (index == test_words.length) {
                clearInterval(timerId);
            }
        }, interval);
        state = 1;
    }

    this.pause = function () {

        if (state != 1) return;
        window.clearInterval(timerId);
        state = 2;

    }

    this.resume = function () {

        if (state != 2) return;
        window.setTimeout(this.timeoutCallback,0);
        state = 3;

    }

    this.timeoutCallback = function () {
        if (state != 3) return;

        timerId = window.setInterval(function () {
            document.getElementById("question").innerHTML = test_display;
            index += 1;
            test_display += " " + test_words[index];
            if (index == test_words.length) {
                clearInterval(timerId);
            }
        }, interval);
        state = 1;
    }

    this.correct = function () {
        if (state != 4) return;
    }
}

function keycheck(event) {

    keycode = event.which;
    
    if (keycode == 32) {
        console.log(keycode);
        document.getElementById("buzz").style.backgroundColor = "red";
        $("#buzz").click();
    }
    else if (keycode == 114) {
        console.log(keycode);
        document.getElementById("test").style.backgroundColor = "blue";
        $("#test").click();
    }
    else {
        console.log(keycode);
        document.getElementById("test").style.backgroundColor = "green";
    }
    
}

$(document).ready(function () {

    var display_speed = 500;

    window.addEventListener('keypress', keycheck)

    $("#next_question").bind("click", function () {
        $.getJSON("/background_process", {
            type: "Next"
        },
            function (data) {
                test_timer = new show(display_speed,data.result);
                test_timer.start();                
            });
        return false
    });

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

    $("#buzz").bind("click", function () {
        test_timer.pause()
        $("#user_answer").focus();
        return false
    });

    $("#test").bind("click", function () {
        test_timer.resume()
        console.log("test");
        return false
    });


    
});
