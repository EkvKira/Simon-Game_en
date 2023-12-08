// Array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the game pattern
var gamePattern = [];

// Array to store the user's clicked pattern
var userClickedPattern = [];

// Boolean variable to track whether the game has started
var started = false;

// Variable to store the current level of the game
var level = 0;

// Event listener for button clicks
$(".btn").click(function () {
  if (started) {
    // Get the color of the clicked button
    var userChosenColour = $(this).attr("id");

    // Add the chosen color to the user's pattern
    userClickedPattern.push(userChosenColour);

    // Play the game and check the user's answer
    playGame(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

// Event listener for the "Start" button click
$("#startBtn").click(function () {
  if (!started) {
    startGame();
  } else {
    startOver();
  }
});

// Event listener for the "Reset" button click
$("#resetBtn").click(function () {
    startGame();
});

// Function to start the game
function startGame() {
  // Update the level display
  $("#level-title").text("Level " + level);

  // Generate the next sequence in the game
  nextSequence();

  // Set the game as started
  started = true;

  // Hide the "Start" button and show the "Reset" button
  $("#startBtn").addClass("hidden");
  $("#resetBtn").removeClass("hidden");
}

// Function to play the game (play sound and animate button press)
function playGame(userChosenColour) {
  playSound(userChosenColour);
  animatePress(userChosenColour);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Check if the user has completed the sequence
    if (userClickedPattern.length === gamePattern.length) {
      // If level 30 is reached, display a victory message
      if (level === 30) {
        $("#level-title").html('<span style="color: green;">Congratulations, you won the game!!</span><br> Press "Start" to play again.');
        startOver();
      } else {
        // Move to the next level after a delay
        setTimeout(nextSequence, 1000);
      }
    }
  } else {
    // Handle a wrong answer
    handleWrongAnswer();
  }
}

// Function to generate the next sequence in the game
function nextSequence() {
  // Reset the user's clicked pattern
  userClickedPattern = [];

  // Increment the level and update the level display
  level++;
  $("#level-title").text("Level " + level);

  // Generate a random color and add it to the game pattern
  generateRandomColour();
}

// Function to generate a random color for the game pattern
function generateRandomColour() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Display the color animation and play the corresponding sound
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Function to animate a button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play a sound based on the provided name
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to handle a wrong answer
function handleWrongAnswer() {
  // Play a "wrong" sound and add a game-over class to the body
  playSound("wrong");
  $("body").addClass("game-over");

  // Display a game-over message and prompt to start again
  $("#level-title").html('<span style="color: red;">Game Over!!! </span><br> Press "Start" to play again.');

  // Remove the game-over class after a delay
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  // Restart the game
  startOver();
}

// Function to reset the game state
function startOver() {
  // Reset the level, game pattern, and game status
  level = 0;
  gamePattern = [];
  started = false;

  // Show the "Start" button and hide the "Reset" button
  $("#startBtn").removeClass("hidden");
  $("#resetBtn").addClass("hidden");
}
