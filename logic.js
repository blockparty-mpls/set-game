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

//The function below will shuffle the deck, but it seems like the getDeck function is already returning a shuffled deck?
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

// write a function that initially deals the cards
function deal9(){
    // grab the number of cards from the deck
    var initial = deck.slice(0,9);
    deck.splice(0, 9);
    return initial;
};

// function that deals the replacement cards
function deal3(){
    // grab the number of cards from the deck
    var replacement = deck.slice(0,3);
    deck.splice(0, 3);
    return replacement;
};

// Function to display the dealt cards in the UI
function dealCards(cards) {
    // empty html string to concatenate before appending to dom
    let html = '';
    // loop through the number of the 'cards' argument
    cards.forEach((card, i) => {
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
            <div class="col-lg-4 col-med-6">
                <div class="game-card" data-id=${i} data-color=${card.color} data-num=${card.num} data-shape=${card.shape} data-clarity=${card.clarity}>
                    ${shapes}
                </div>
            </div>
        `
        html += newCard;
    }); 
    // add all dealt cards to the dom
    return document.getElementById('gameboard').insertAdjacentHTML('beforeend', html);
}


var clickHandler = function (event) {
    
    //check if clicked element or its parent has a [data-monster-id] attribute, if not do nothing
    var card = event.target.closest('.game-card');
    if(!card) {
        return;
    }
    if (card.classList.contains(`clicked`)) {
        console.log(`duplicate!`);
        return
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
    console.log(chosenCards);
    if (chosenCards.length === 3) {
        checkSet(chosenCards);
    }
};

// create new variable for the dealt cards at start of game
let dealtCards = deal9();

// use dealt cards variable in deal cards function
dealCards(dealtCards);
// create empty array for clicked/chosen cards - need to check (checkSet) once length is 3

// ==========================================
// GAME LOGIC
// ==========================================

//+++++ GLOBAL VARIABLES ++++++++++++++++++
let chosenCards = [];
let userScore = 0;

//Create a function that checks an array of cards for "setness"
/**
 * Check an arry of three selected cards for "setness"
 * @param  {Array} selected The array containing the cards to be compared
 * @return {Boolean}  true if set is valid, false if not
 */

var checkSet = function(selected) {
    console.log(selected);
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
        chosenCards = [];
        replaceCards(); 
    } else {

        console.log("That's not a set!");
        // TODO: this is for testing without getting a 'set' - need to replace with commented out code
        replaceCards();

        // chosenCards.forEach(card => {
        //     chosenCards = [];
        //     // get the current ID for each chosen card
        //     cardId = card.id;
        //     // create reference for that element in the dom to which append the new data and shape divs
        //     cardEl = document.querySelector(`[data-id=${CSS.escape(cardId)}]`);
        //     // remove the clicked class box shadow styles
        //     cardEl.classList.remove('clicked');
        // });
    };
};


var replaceCards = function () {
    // create variable for the array of replacemlent cards
    let replacementCards= deal3();
    console.log('replacementCards cards: ',replacementCards)
    
    chosenCards.forEach((card, index) => {
        
        let shapes = '';
        // get the current ID for each chosen card
        cardId = card.id;
        // create reference for that element in the dom to which append the new data and shape divs
        cardEl = document.querySelector(`[data-id=${CSS.escape(cardId)}]`);
        // remove the clicked class box shadow styles
        cardEl.classList.remove('clicked');

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

    chosenCards = [];

    console.log(deck);

}

document.addEventListener('click', clickHandler, false);