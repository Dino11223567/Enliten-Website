function test(){
   $.getJSON("/background_process", {
            response:$("input[name='response']").val(),
        },
            function (data) {
                $("#result").text(data.result);
            });
        return false
}

//this code goes in a javascript file and is called in the html with onclick = function()
//doesn't work
