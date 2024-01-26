//Press any key to begin
var gameState = 0; //=0 on blank page, 1 when in game, and 2 for gameover screen
var gameSequence = []; //remembers the sequence of buttons to press
var colour; //most recent colour the user has pressed
var levelNumber; //level counter
var i; //counter to iterate through gameSequence
var nextStep = ["green","red", "yellow", "blue"]
var redAudio = new Audio("./sounds/red.mp3"); //audio objects for each button
var greenAudio = new Audio("./sounds/green.mp3");
var yellowAudio = new Audio("./sounds/yellow.mp3");
var blueAudio = new Audio("./sounds/blue.mp3");
var wrongAudio = new Audio("./sounds/wrong.mp3");

function colourSelect(){ //function to select the next colour in the game

    let randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*4);

    return nextStep[randomNumber]
};

function colourFlash(chosenColour){ //make a button flash when pressed or chosen by game

    playSound(chosenColour);
    $("#" + chosenColour).addClass("pressed");//colour flash
    setTimeout(function(){
        $("#" + chosenColour).removeClass("pressed");
    }, 100);

};

function gameStart(){ //start a new game

    levelNumber = 1;
    gameSequence = [];
    i = 0;
    gameState = 1;
    $('h1').text("Level " + levelNumber);
};

function playSound(name){ //play sound depending on which button is chosen
    switch (name) { //switch outcome based on certain cases
    
        case "red":
            redAudio.currentTime = 0;
            redAudio.play();
            break;
        
        case 'green':
            greenAudio.currentTime = 0;
            greenAudio.play();
            break;
        
        case 'yellow':
            yellowAudio.currentTime = 0;
            yellowAudio.play();
            break;
        
        case 'blue':
            blueAudio.currentTime = 0;
            blueAudio.play();
            break;

        default:
            console.log(name);
}};


$(document).keypress(function () {//bind eventlistener to document for keypress
    if (gameState === 0) {
        gameStart();

        //first colour of game
        gameSequence[0] = colourSelect();
        colourFlash(gameSequence[0]);


    }
    else if (gameState === 2){
        //return gameState to 0
        gameStart();


        gameSequence[0] = colourSelect();
        colourFlash(gameSequence[0]);
        $("h2").remove();
    }
});

$('.btn').click(function() {
    console.log($(this).attr("id"));
    colour = $(this).attr('id');
    
    if (gameState === 1) {
        if (colour === gameSequence[i]) {// colour match
            playSound($(this).attr('id'));

            colourFlash(gameSequence[i]); //flash chosen colour if correct

            if (i === gameSequence.length-1) {//if sequence complete

                levelNumber++ //show next level number
                $('h1').text("Level " + levelNumber);//show new level number

                gameSequence[i+1] = colourSelect(); //select next colour in sequence

                setTimeout(function(){
                    colourFlash(gameSequence[i+1]); 
                    i=0; //restart counter once full sequence pressed
                }, 750 //choose new colour and expand sequence after set interval
                ); 
            }

            else { 
                i++;
            }
        }

        else {//wrong colour chosen
            gameState = 2;
            wrongAudio.play();
            $('body').addClass('game-over');
            $("body").append("<h2>Press Any Key To Restart</h2>");
            $('h1').text('Well done, you reached level ' + levelNumber);
            setTimeout(function(){
                $('body').removeClass('game-over');
            }, 300)
        }
    }
});