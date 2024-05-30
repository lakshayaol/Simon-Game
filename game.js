
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickPattern = [];
var level = 0 ;
var started = false ;


$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length - 1) ;
});

$(document).keydown(function() {

    if(!started) {
        $("#level-title").text("Level " + level) ;
        nextSequence() ; 
        started = true ;
    }
});

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickPattern[currentLevel]) {

        console.log("success") ;

        if(userClickPattern.length === gamePattern.length) {

            setTimeout(function() {
                nextSequence() ;
            }, 1000);
        }
    }

    else {

        console.log("wrong") ;

        playSound("wrong") ;
        
        $("body").addClass("game-over") ;
        setTimeout(function() {
            $("body").removeClass("game-over") ;
        },200);
        
        $("h1").text("Game Over, Press Any Key to Restart") ;
        startOver() ;
    }
}

function playSound(name) {

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {

    userClickPattern = [] ;

    level++ ;
    $("#level-title").text("Level " + level) ;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {

    level = 0 ;
    gamePattern = [] ;
    started = false ;
}