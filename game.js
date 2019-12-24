var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []

// Start Game
var started = false;
var level = 0;

// Detect when a keyboard key has been pressed, when this happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// User Clicks Pattern
$(".btn").click( function handler() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

// Sequence Generator
function nextSequence() {
  userClickedPattern = [];

  level += 1;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(randomChosenColor);
}

// Plays respective Sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animaton
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  } , 100);

  var audio = new Audio("sounds/" + currentColor + ".mp3");
  audio.play();
}

// Check Answer
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    } else {
        playSound("wrong");

        $("#level-title").html("Game Over!<br><span style='font-size: 1rem;'>Press Any Key to Restart</span>");

        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);
        startOver();
      }
}

// Restart
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
