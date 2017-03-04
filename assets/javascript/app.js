

var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, chE, correct = 0;
var questions = [
  [ "What is the capital of California?", "San Francisco", "Juneau", "Sacramento","Los Angeles", "C" ],
  [ "What is the sleepiest animal in the world, sleeping around 22 hrs each day?", "Bear", "Koala", "Cat","Dog" ,"B" ],
  [ "What is 7 x 3?", "21", "24", "25", "10","A" ],
  [ "How old must a person be to run for President of the United States?", "21", "40", "35","50" ,"C" ],
  [ "What takes an average of 8 minutes 20 seconds to reach the Earth?", "Snow fall", "Rain fall", "Light from the sun","Meteorite shower" ,"C" ]
];
function _(x){
  return document.getElementById(x);
}

function renderQuestion(){
  test = _("test");
  if(pos >= questions.length){
    test.innerHTML = "<h2>Correct answers "+correct+"</h2>";
    test.innerHTML += "<h2>Wrong answers "+ ((questions.length) - (correct))+"</h2>";

    _("test_status").innerHTML = "Trivia Completed";
    pos = 0;
    correct = 0;
    $("#label2").show();
    $("#start").show();
    $("#label").hide();
     stopwatch.stop();
    return false;
  }
  _("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
  question = questions[pos][0];
  chA = questions[pos][1];
  chB = questions[pos][2];
  chC = questions[pos][3];
  chD = questions[pos][4];
  chE = questions[pos][5];
  test.innerHTML = "<h3>"+question+"</h3> <br>";
  test.innerHTML += "<input type='radio' name='choices' value='A'>"+chA+"<br>";
  test.innerHTML += "<input type='radio' name='choices' value='B'> "+chB+"<br>";
  test.innerHTML += "<input type='radio' name='choices' value='C'> "+chC+"<br>";
  test.innerHTML += "<input type='radio' name='choices' value='D'> "+chD+"<br><br>";
}

function checkAnswer(){
  choices = document.getElementsByName("choices");
  for(var i=0; i<choices.length; i++){
    if(choices[i].checked){
      choice = choices[i].value;
    }
  }
  if(choice == questions[pos][5]){
    correct++;
    
  }
  pos++;
  renderQuestion();
  
}
  
window.addEventListener("load", renderQuestion, false);

$(document).ready(function(){
  $("#start").on("click", stopwatch.start);
  $("#test_status").hide();
  $("#test").hide();
  $("#answer").hide();
  $("#display").hide();
  $("#label").hide();
  $("#label2").hide();

});


var intervalId;

var stopwatch = {
  time: 5,
  reset: function() {

    stopwatch.time = 5;
    $("#display").html("00:00");
  },


  start: function() {
    intervalId = setInterval(stopwatch.count, 1000);
      $("#start").hide();
      $("#test_status").show();
      $("#test").show();
      $("#answer").show();
      $("#display").show();
      $("#label").show();
      $("#label2").hide();
      renderQuestion();
      
   },

  stop: function() {
    clearInterval(intervalId);
  },


  count: function() {
     stopwatch.time--;
   
   if (stopwatch.time < 0){  
  
    checkAnswer();
    stopwatch.reset(stopwatch.time);

      return;
    }

    var converted = stopwatch.timeConverter(stopwatch.time);
 

    $("#display").html(converted);
  },


  timeConverter: function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }
};




