
var display_speed = 100;
var buzz_state = false;
var question_state = 0; //0 = null, 1= running, 2 = end

function show(interval, question_string) {
  var displayId, countId, start_count, remaining, countdown, index = 0;
  var state = 0; //0 = idle, 1= running , 2 = paused, 3 = resumed
  var test_words = question_string.split(" ");
  var test_display = test_words[index];


  this.start = function() { //This part works
    if (state != 0) return;
    countdown = 10000;
    question_state = 1;
    displayId = window.setInterval(function() {
      document.getElementById("question").innerHTML = test_display;
      index += 1;
      test_display += " " + test_words[index];
      if (index == test_words.length) {
        clearInterval(displayId);
        question_state = 2;
        countId = window.setTimeout(end, countdown);
        start_count = new Date();
      }
    }, interval);
    state = 1;

  }

  this.pause = function() {
    if (state != 1) return;
    clearInterval(displayId);
    if (question_state == 2) {
      clearTimeout(countId);
      remaining = countdown - (new Date() - start_count);
      countdown = remaining;
    }
    state = 2;

  }

  this.countdown = function() {
    if (state != 2) return;
    countId = window.setTimeout(end, remaining);
  }

  this.resume = function() { //need to make it so they have specific time
    if (state != 2) return;
    displayId = window.setInterval(function() {
      document.getElementById("question").innerHTML = test_display;
      index += 1;
      test_display += " " + test_words[index];
      if (index == test_words.length) {
        clearInterval(displayId);
        question_state = 2;
        countId = window.setTimeout(end, countdown);
        start_count = new Date();

      }
    }, interval);
    state = 1;
  }
}


function end() {
  if (buzz_state == true) {
  $("#submit_answer").click();
}
  $.getJSON("/background_process", {
      type: "End"
    },
    function(data) {
      $("#result").text(data.result);
    });
  question_state = 0;
}


function keycheck(event) {

  keycode = event.which;
  target = event.target.id;
  if (target != "user_answer") {
    if (keycode == 32) { // space bar
      $("#buzz").click();
    }

    if (keycode == 110) { //n
      $("#next_question").click();
    }
  }

  if (keycode == 13) { //enter key aka submit key
    event.preventDefault();
    $("#submit_answer").click();
  }

}

$(document).ready(function() {

  window.addEventListener('keypress', keycheck)

  $("#next_question").bind("click", function() {
    if (question_state == 0) {
      $.getJSON("/background_process", {
          type: "Next"
        },
        function(data) {
          timer = new show(display_speed, data.result);
          timer.start();
          $("#result").innerHTML("Result");
        });
    }
    return false
  });

  $("#submit_answer").bind("click", function() {
    if (buzz_state == true) {
      document.getElementById('user_answer').style.display = 'none';
      document.getElementById('result').style.display = 'block';
      $.getJSON("/background_process", {
          type: "Answer",
          response: $("input[name='response']").val()
        },
        function(data) {
          $("#result").text(data.result);
        });
      $("#user_answer").blur();
      $("#user_answer").val('');
      buzz_state = false;
      if (question_state == 1) {
        timer.resume();
      }
      if (question_state == 2) {
        timer.countdown();
      }

    }

    return false
  });

  $("#buzz").bind("click", function() {
    if (question_state == 1 || 2) {
      document.getElementById('user_answer').style.display = 'block';
      document.getElementById('result').style.display = 'none';
      timer.pause();
      buzz_state = true;
      $("#user_answer").focus();
      $("#user_answer").val('');
      window.setTimeout(function() {
        $("#submit_answer").click();
      }, 10000);
    }
    return false

  });

  $("#test").bind("click", function() {
    return false
  });



});
