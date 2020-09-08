//make the deck 
var Card = function(color, number, shape, clarity) {
    this.color = color;
    this.number = number;
    this.shape = shape;
    this.clarity = clarity;
};

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

//console.log(getDeck());

// console.log(deck[Math.floor(Math.random() * deck.length)]);

getDeck();

console.log(deck);

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

//console.log(shuffle(deck));

deck = shuffle(deck);

// write a function that initially deals the cards
function deal(){

//     grab the number of cards from the deck
var initial = deck.slice(0,9);
deck.splice(0, 9);
console.log(initial);
console.log(deck);
return initial;
};


//     display the cards in the UI
//         loop through the number of the 'cards' argument

//         create new 'div' element with a class of 'game-card' for each card from the array

//             determine how many divs to nest within this new div element based on the 'num' property of each card

//             append color, shape, and clarity classes based on the properties for each



//     remove the selected cards from the 'deck' array



deal();

var cards = [deck[0], deck[1], deck[2]];

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
    } else {
        console.log("That's not a set!");
    };
};

checkSet(cards);