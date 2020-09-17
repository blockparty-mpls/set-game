//+++++ GLOBAL VARIABLES ++++++++++++++++++
let chosenCards = [];
let userScore = 0;
const scoreboard = document.getElementById('scoreboard');
const timerBox = document.getElementById('timer');
let timeRemaining = 1000;
var gameboard = document.getElementById('gameboard');
var timer;


//make the deck 

var colors = ['red', 'green', 'purple'];

var numbers = [1, 2, 3];

var shapes = ['diamond', 'squiggle', 'oval'];

var clarity = ['transparent', 'shaded', 'opaque'];

var deck = [];


var getDeck = function(){

    for (var i = 0; i < colors.length; i++) {
        for (var j = 0; j < numbers.length; j++) {
            for (var k = 0; k < shapes.length; k++) {
                for (l = 0; l < clarity.length; l++) {
                    var card = {
                        color: colors[i],
                        num: numbers[j],
                        shape: shapes[k],
                        clarity: clarity[l]
                    };
                    deck.push(card);
                }
            }
        }
    }
}

// TODO: put this in a separate 'start' function 
getDeck();

//Create a timer function
function startTimer () {
    
    if (timeRemaining === 0){
        console.log("Time's up!");
        clearInterval(timer);
        timerBox.innerText = `Time is up!`;
        endGame();
        return
    };
    
    timerBox.innerText = timeRemaining;
    timeRemaining--;
}

// var timer = setInterval(startTimer, 1000);

var endGame = function() {
    
    //clear the cards from the board
    gameboard.innerHTML = "";

    //render a 'game over' message
    gameboard.innerHTML = `<h2>Game Over!</h2>`;

    //render a button which would allow the user to start a new game
    var restartBtn = document.createElement('button');
    restartBtn.innerText = 'Play Again?';
    
    restartBtn.addEventListener('click', function(){
        startGame();
    });
    
    console.log(restartBtn);
    gameboard.appendChild(restartBtn);
}


//The function below will shuffle the deck
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffle = function(array) {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};

deck = shuffle(deck);

// // write a function that initially deals the cards
// function deal(cardNumber){
//     // grab the number of cards from the deck
//     var cards = deck.slice(0, cardNumber);
//     deck.splice(0, cardNumber);
//     return cards;
// };

// Function to display the dealt cards in the UI
function deal(cards) {

    // grab the number of cards from the deck
    var dealt = deck.slice(0, cards);
    deck.splice(0, cards);

    // empty html string to concatenate before appending to dom
    let html = '';
    // loop through the number of the 'cards' argument
    dealt.forEach((card, i) => {
        // create empty variable for shapes
        let shapes = '';
        // determine how many divs to nest within this new div element based on the 'num' property of each card
        for(let i = 0; i < card.num; i++) {
            let shapeDiv = `<div class="${card.color} ${card.shape} ${card.clarity}"></div>`
            // append color, shape, and clarity classes based on the properties for each
            shapes += shapeDiv;
        }
        // create new element with necessary divs and 'game-card' class for each card from the array
        // add data attributes to 'game-card' div
        let newCard = `
            <div class="col-lg-3 col-med-4">
                <div class="game-card grow-center" data-id=${i} data-color=${card.color} data-num=${card.num} data-shape=${card.shape} data-clarity=${card.clarity}>
                    ${shapes}
                </div>
            </div>
        `
        html += newCard;
        scoreboard.innerHTML = userScore;
    }); 

    // add all dealt cards to the dom
    gameboard.insertAdjacentHTML('beforeend', html);

    // remove the animation class from card divs
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('transitionend', (e) => {
            card.classList.remove('grow-center');
        })
    });

};


// create the function to handle clicks on the cards
var clickHandler = function (event) {
    
    //check if clicked element or its parent has a class of 'game-card'; escape the function if not
    var card = event.target.closest('.game-card');
    if(!card) {
        return;
    }
    // if card is already selected, remove the styles and remove it from the chosenCards array
    if (card.classList.contains(`clicked`)) {
        const newArr = chosenCards.filter(chosen => chosen.id !== card.dataset.id);
        card.classList.remove('clicked');
        return chosenCards = newArr;
    }

    card.className += ` clicked`;

    let cardData = {
        id: card.getAttribute('data-id'),
        color: card.getAttribute('data-color'),
        num: card.getAttribute('data-num'),
        shape: card.getAttribute('data-shape'),
        clarity: card.getAttribute('data-clarity')
    };
    
    chosenCards.push(cardData);
    console.log('chosenCards array: ', chosenCards);
    if (chosenCards.length === 3) {
       checkSet(chosenCards);
    }
};

// // create new variable for the dealt cards at start of game
// let dealtCards = deal(12);

// ==========================================
// GAME LOGIC
// ==========================================

//Create a function that checks an array of cards for "setness"
/**
 * Check an arry of three selected cards for "setness"
 * @param  {Array} selected The array containing the cards to be compared
 * @return {Boolean}  true if set is valid, false if not
 */

var checkSet = function(selected) {
    // console.log(selected);
    //create four nested functions, one for each of the properties that you need to compare
    var checkColor = function(){
        if (selected[0].color === selected[1].color && selected[0].color === selected[2].color && selected[1].color === selected[2].color){
            return true
        } else if (selected[0].color !== selected[1].color && selected[0].color !== selected[2].color && selected[1].color !== selected[2].color){
            return true
        } else {
            return false
        };
    };
    var checkNumber = function(){
        if (selected[0].num === selected[1].num && selected[0].num === selected[2].num && selected[1].num === selected[2].num){
            return true
        } else if (selected[0].num !== selected[1].num && selected[0].num !== selected[2].num && selected[1].num !== selected[2].num){
            return true
        } else {
            return false
        };
    };
    var checkShape = function(){
        if (selected[0].shape === selected[1].shape && selected[0].shape === selected[2].shape && selected[1].shape === selected[2].shape){
            return true
        } else if (selected[0].shape !== selected[1].shape && selected[0].shape !== selected[2].shape && selected[1].shape !== selected[2].shape){
            return true
        } else {
            return false
        };
    };
    var checkClarity = function(){
        if (selected[0].clarity === selected[1].clarity && selected[0].clarity === selected[2].clarity && selected[1].clarity === selected[2].clarity){
            return true
        } else if (selected[0].clarity !== selected[1].clarity && selected[0].clarity !== selected[2].clarity && selected[1].clarity !== selected[2].clarity){
            return true
        } else {
            return false
        };
    };

    var color = checkColor();
    var number = checkNumber();
    var shape = checkShape();
    var clarity = checkClarity();

    if (color === true && number === true && shape === true && clarity === true){
        console.log("You found a set!");
        userScore ++;
        timeRemaining += 6;
        scoreboard.innerHTML = userScore;
        
        if (deck.length > 0) {
            console.log(deck);
            replaceCards(); 
        } 
    } else {
        console.log(deck);
        if (deck.length > 0) {
            console.log(deck);
            replaceCards(); 
        }

        // TODO: this is for testing without getting a 'set' - need to replace with commented out code
        //return;

        // use a timeout for UI purposes
        // setTimeout(() => {
        // chosenCards.forEach(card => {
        //     chosenCards = [];
        //     // get the current ID for each chosen card
        //     cardId = card.id;
        //     // create reference for that element in the dom to which append the new data and shape divs
        //     cardEl = document.querySelector(`[data-id=${CSS.escape(cardId)}]`);
        //         // remove the clicked class box shadow styles
        //         cardEl.classList.remove('clicked');
            // });
    //     }, 200);
    };
};


var replaceCards = function () {
    // create variable for the array of replacement cards
    console.log(deck);
    // if (deck.length < 3) {
    //     let replacementCards = deck.slice(0, deck.length);
    //     deck.splice(0, deck.length);
    // } else {
    //     let replacementCards = deck.slice(0, 3);
    //     deck.splice(0, 3);
    //     console.log('replacementCards cards: ', replacementCards)
    // }

    let replacementCards = deck.slice(0, 3);
        deck.splice(0, 3);
        console.log('replacementCards cards: ', replacementCards)

    // use a timeout for UI purposes 
    setTimeout(() => {
        chosenCards.forEach((card, index) => {
            
            let shapes = '';
            // get the current ID for each chosen card
            cardId = card.id;
            // create reference for that element in the dom to which append the new data and shape divs
            cardEl = document.querySelector(`[data-id=${CSS.escape(cardId)}]`);
            // remove the clicked class box shadow styles
            cardEl.classList.remove('clicked');
            // add the animation class
            cardEl.classList.add('shrink');
            // wait till first transition is finished, then remove first class and add second animation
            cardEl.addEventListener('transitionend', (e) => {
                e.target.classList.remove('shrink');
                e.target.classList.add('grow');
                e.target.classList.remove('grow');
            });
            
            // make the shape divs according to the number of shapes in each replacement card
            for(let i = 0; i < replacementCards[index].num; i++) {
                let shapeDiv = `<div class="${replacementCards[index].color} ${replacementCards[index].shape} ${replacementCards[index].clarity}"></div>`;
                shapes += shapeDiv;
                // append shapes and set attributes on clicked/existing div in the grid
                cardEl.innerHTML = shapes;
                cardEl.setAttribute('data-color', replacementCards[index].color);
                cardEl.setAttribute('data-num', replacementCards[index].num);
                cardEl.setAttribute('data-shape', replacementCards[index].shape);
                cardEl.setAttribute('data-clarity', replacementCards[index].clarity);
            }
        });
        // reset the array of clicked cards
        chosenCards = [];
    }, 200);
    
    // console.log(deck);

}

/*
Here, I added a function to start the game when the user clicks on the button on the landing screen. 
I also combined the 'deal' function with the 'dealCards' function...now there's only one function called 'deal' which accepts a number
as an argument for the number of cards that you want to deal. The startGame function will also start the timer. 
*/
function startGame() {
    //clear the instructions
    gameboard.innerHTML = ``;
    //empty the deck array
    deck = [];
    //generate a new deck
    getDeck();
    //shuffle the deck
    shuffle(deck);

    //start the timer
    timer = setInterval(startTimer, 1000);

    //deal 12 cards
    deal(12);
};

document.addEventListener('click', clickHandler, false);

document.querySelector(`#start-game`).addEventListener('click', startGame);