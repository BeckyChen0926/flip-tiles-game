//Author: Becky Chen (bc103)

//global variables
//clickCount stores whether the user is clicking for the
//first or second time.
var clickCount = 1;
//store the ID of the first cell clicked on 
var clickId;
var tries = 0;
var matches = 0;

//Stage 1: Reveal and conceal images on the board
//create random configuration of hidden images
shuffleImages();
//showImage takes in the id of the clicked images as an argument
//and reveals the corresponding image on the board
function showImage(imgId){
    $('#'+imgId).attr('src', getImage(imgId));
}
//hideImage takes in the id of the images the user just clicked
//and turns it back into a blank image
function hideImage(imgId){
    $('#'+imgId).attr('src', 'blank.jpg');
}
//processClick reveals a image when clicked on. 
//If it is the first click of the pair, the image is not hidden
//if it is the second click, both images are hidden after 1 sec
function processClick(imgId){
    showImage(imgId);
    if (clickCount === 1){
        clickId = imgId;
        clickCount = 2;
    } else if (clickCount === 2){
        tries++;
        $('#tries').text(tries);
        if (getImage(imgId) === getImage(clickId) && imgId !== clickId) {
            matches++;
            $('#matches').text(matches);
            if (matches === 8) {
                $('#msg').text('Game Over. Congradulations!');
            } else {
                $('#msg').text('Match!');
                //makes the Match! message go away after 1 second so that 
                //it isnt distractive
                setTimeout(function () {$('#msg').text('');}, 1000);
            }
        } else {
            setTimeout(function () { hideImage(clickId); }, 1000);
            setTimeout(function () { hideImage(imgId); }, 1000);
        }  
        clickCount = 1;
    }
}

//Stage 2: Handler Attachment
//gather a jQuery set of clickable images
var clickables = $('#board img').some();
//add event handlers to each img that when one of them is 
//clicked, invoke processClick on its id
clickables.each((index) => {
    let constructId = 'cell'+(index+1);
    $('#'+constructId).one().click(function (){
        //event.preventDefault();
        processClick(constructId);
    })
});

//Stage 6: start new games
function startNewGame() {
    shuffleImages();
    //reset global variables
    clickCount = 1;
    clickId = '';
    tries = 0;
    matches = 0;
    //reset texts of tries and matches to 0
    $('#tries').text('0');
    $('#matches').text('0');
    $('#msg').text('');

    //hides all tiles that are flipped
    $('#board img').each((index) => {
        let hereId = 'cell'+(index+1);
        hideImage(hereId);
    });
}

//add startNewGame button clickhandler
$('#startNewGameButton').click(startNewGame);


