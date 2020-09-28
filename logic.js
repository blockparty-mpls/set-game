//+++++ GLOBAL VARIABLES ++++++++++++++++++
let chosenCards = [];
let userScore = 0;
const scoreboard = document.getElementById('scoreboard');
const timerBox = document.getElementById('timer');
let timeRemaining = 60;
const gameboard = document.getElementById('gameboard');
const gameDetails = document.getElementById('game-details');
const checkSetMessage = document.getElementById('check-set');
const playerScores = document.getElementById('player-scores');
var timer;
let isPlayingGame = false;

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

//Create a timer function
function startTimer () {
    
    if (timeRemaining === 0){
        console.log("Time's up!");
        clearInterval(timer);
        timerBox.innerText = `Time is up!`;
        if(isPlayingGame) {
            endGame();
        } else {
            showHomeScreen();
        }
        return
    };
    
    timerBox.innerText = timeRemaining;
    timeRemaining--;
}

var endGame = function() {

    // if there is a user, add their scores etc to the db
    if(auth.currentUser) {
        db.collection('userScores').add({
            user: auth.currentUser.displayName,
            score: userScore,
            createdAt: new Date()
        });
    } else {
        console.log('not logged in');
    }

    // update game status
    isPlayingGame = false;

    // reset the timer
    timeRemaining = 0;

    // clear the timer display
    timerBox.innerText = '';

    // hide the game details over cards
    gameDetails.style.display = 'none';
    
    //clear the cards from the board
    gameboard.innerHTML = "";

    //render a 'game over' message
    gameboard.innerHTML = `
        <div id="game-over" class="text-center margin-auto">
            <h2>Game Over!</h2>
            <p>${auth.currentUser ? auth.currentUser.displayName : 'anonymous'} - Score: ${userScore}</p>
        </div>
    `;

    //render a button which would allow the user to start a new game
    var restartBtn = document.createElement('button');
    restartBtn.innerText = 'Play Again?';
    
    restartBtn.addEventListener('click', function(){
        startGame();
    });
    // append the button to the dynamic html created above
    document.getElementById('game-over').appendChild(restartBtn);
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
                <div aria-live="polite" class="game-card grow-center" data-id=${i} data-color=${card.color} data-num=${card.num} data-shape=${card.shape} data-clarity=${card.clarity}>
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
        checkSetMessage.innerText = 'You found a set!';
        userScore ++;
        timeRemaining += 6;
        scoreboard.innerHTML = userScore;
        
        if (deck.length > 0) {
            console.log(deck);
            replaceCards(); 
        }
    } else {
        // console.log(deck);
        checkSetMessage.innerText = 'That is not a set.'

        // if (deck.length > 0) {
        //     console.log(deck);
        //     replaceCards(); 
        // }
        // TODO: this is for testing without getting a 'set' - need to replace with commented out code
        //return;

        // use a timeout for UI purposes
        setTimeout(() => {
        chosenCards.forEach(card => {
            chosenCards = [];
            // get the current ID for each chosen card
            cardId = card.id;
            // create reference for that element in the dom to which append the new data and shape divs
            cardEl = document.querySelector(`[data-id=${CSS.escape(cardId)}]`);
                // remove the clicked class box shadow styles
                cardEl.classList.remove('clicked');
            });
        }, 200);
    };
};

// TODO: fix this function to remove the last cards after deck is empty
// var removeCards = function() {
//     // use a timeout for UI purposes 
//     // setTimeout(() => {
//         chosenCards.forEach((card, index) => {
            
//             // get the current ID for each chosen card
//             cardId = card.id;
//             // create reference for that element in the dom to which append the new data and shape divs
//             cardEl = document.querySelector(`[data-id=${CSS.escape(cardId)}]`);
//             // remove the clicked class box shadow styles
//             cardEl.classList.remove('clicked');
//             // add the animation class
//             cardEl.classList.add('shrink');
//         });
//         // reset the array of clicked cards
//     chosenCards = [];
//     // }, 200);
// }


var replaceCards = function () {
    // create variable for the array of replacement cards
    // console.log(deck);
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

    // update the game status
    isPlayingGame = true;
    //clear the instructions
    gameboard.innerHTML = ``;
    // set user score to 0
    userScore = 0;
    //empty the deck array
    deck = [];
    //generate a new deck
    getDeck();
    //shuffle the deck
    shuffle(deck);
    //refill the timer
    timeRemaining = 60;

    //start the timer
    timer = setInterval(startTimer, 1000);

    // display the game details over cards
    gameDetails.style.display = 'flex';

    //deal 12 cards
    deal(12);
};

function showHomeScreen() {
    
    // update game status
    isPlayingGame = false;

    // reset the timer
    timeRemaining = 0;

    // hide the game details over cards
    gameDetails.style.display = 'none';
    
    //clear the cards from the board
    gameboard.innerHTML = "";

    //render a 'game over' message
    gameboard.innerHTML = `
        <div id="rules" class="col">
            <h1>Set - A card-based game of logic</h1>
            <h4>How does it work?</h4>
            <p>The objective of the game is to find 'sets'. You have sixty seconds to find as many sets as you
                can. Each time you find a valid set, 5 seconds will be added to the game clock.</p>
            <h4>What makes a set?</h4>
            <p>Each card has four attributes: color (red, green, or purple), shape (diamond, circle, or 'leaf'),
                clarity (transparent, shaded, opaque), and number (1, 2, 3).
                A valid 'set' consists of three cards wherein each attribute is identical or unique across all
                three.
            </p>
            <h4>Could you show me an example?</h4>
            <p>Why yes. Here is an example:</p>
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-med-4">
                        <div class="game-card game-card__example grow-center" data-id="4" data-color="green" data-num="3"
                            data-shape="diamond" data-clarity="transparent">
                            <div class="red diamond transparent"></div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-med-4">
                        <div class="game-card game-card__example grow-center" data-id="4" data-color="green" data-num="3"
                        data-shape="diamond" data-clarity="transparent">
                            <div class="green diamond shaded"></div>
                            <div class="green diamond shaded"></div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-med-4">
                        <div class="game-card game-card__example grow-center" data-id="4" data-color="green" data-num="3"
                        data-shape="diamond" data-clarity="transparent">
                            <div class="purple diamond opaque"></div>
                            <div class="purple diamond opaque"></div>
                            <div class="purple diamond opaque"></div>
                        </div>
                    </div>
                </div>
            </div>
            <p>The example above would be a valid set because...</p>
            <ul class="example-list">
                <li>...the <strong>shapes</strong> are all <strong>identical</strong> (each card is a diamond)</li>
                <li>...the <strong>numbers</strong> are all <strong>unique</strong> (1, 2, and 3)</li>
                <li>...the <strong>shades</strong> are all <strong>unique</strong> (transparent, shaded, and opaque)</li>
                <li>...the <strong>colors</strong> are all <strong>unique</strong> (red, green, and purple)</li>
            </ul>
            <p>Again, as long as each trait is either totally identical or totally unique across the three cards that you pick, you've got a set!</p>
        </div>
    `;

    //render a button which would allow the user to start a new game
    var startBtn = document.createElement('button');
    startBtn.innerText = 'Start the game!';
    
    startBtn.addEventListener('click', function(){
        startGame();
    });
    // append the button to the dynamic html created above
    document.getElementById('rules').appendChild(startBtn);
}

// add click handler to document for card clicks
document.addEventListener('click', clickHandler, false);

// real-time db listener for changes - get top user scores from collection
db.collection('userScores').orderBy("score", "desc").limit(5).onSnapshot(snapshot => {
    playerScores.innerHTML = '';
    snapshot.forEach(item => {
        renderLeaderboard(item);
    });
});

// render the top player names and scores in the leaderboard modal
function renderLeaderboard(doc) {
    let newRow = `
        <tr>
            <td>${doc.data().user}</td>
            <td>${doc.data().score}</td>
        </tr>
    `;
    playerScores.innerHTML += newRow;
}

// dynamically show the start screen on page load
showHomeScreen();