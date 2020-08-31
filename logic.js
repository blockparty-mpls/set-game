//make the deck 
var Card = function(color, number, shape, clarity) {
    this.color = color;
    this.number = number;
    this.shape = shape;
    this.clarity = clarity;
};

var cardX = new Card('black', 12, 'hexagon', 'clear');
var deck = [];

var colors = ['red', 'green', 'purple'];

var numbers = [1, 2, 3];

var shapes = ['diamond', 'squiggle', 'oval'];

var clarity = ['transparent', 'shaded', 'opaque'];

function getDeck(){
    var deck = new Array();
    for (var i = 0; i < colors.length; i++) {
        for (var j = 0; j < numbers.length; j++) {
            for (var k = 0; k < shapes.length; k++) {
                for (l = 0; l < clarity.length; l++) {
                    var card = {
                        color: colors[i],
                        number: numbers[j],
                        shape: shapes[k],
                        clarity: clarity[l]
                    };
                    deck.push(card);
                }
            }
        }
    }
    return deck;
}

console.log(getDeck());

console.log(deck);



for (var i = 0; i < 81; i++) {
    
    deck[i] = new Card(colors[Math.random], 3, 'square', 'shaded');
    
}

console.log(deck);


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  console.log(getRandomInt(3));
  // expected output: 0, 1 or 2
  
  console.log(getRandomInt(1));
  // expected output: 0
  
  console.log(Math.random());
  // expected output: a number between 0 and 1
  