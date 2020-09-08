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

function getDeck(){

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
    // return deck;
}

//console.log(getDeck());

// console.log(deck[Math.floor(Math.random() * 81)]);
// console.log(deck[Math.floor(Math.random() * 81)]);
getDeck();

console.log(deck);

//The function below will shuffle the deck, but it seems like the getDeck function is already returning a shuffled deck?
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
// var shuffle = function (array) {

//     var currentIndex = array.length;
//     var temporaryValue, randomIndex;

//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;

//         // And swap it with the current element.
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;

// };

// console.log(shuffle(deck));

//write a function that initially 
// function deal(cards){

    //grab the number of cards from the deck

    //display the cards in the UI
        //loop through the number of the 'cards' argument

        //create new 'div' element with a class of 'game-card' for each card from the array

            //determine how many divs to nest within this new div element based on the 'num' property of each card

            //append color, shape, and clarity classes based on the properties for each



    //remove the selected cards from the 'deck' array

// }
