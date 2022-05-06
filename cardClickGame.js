const cardList = document.querySelector('.cardList');
const resultText = document.getElementById('result-text');
const scoreText = document.getElementById('score');
const comboText = document.getElementById('combo');
const clickText = document.getElementById('click-counter');
const userInterface = document.getElementById('ui');

// Score starts at zero, increases by 5 for clicking a green card or (10 * combo) for each red card clicked
// Combo increases as you click red cards.
let score = 0;
let combo = 1;
let clicks = 0;

//EVENT LISTENER for WHOLE DOCUMENT: if the game is still going, count the number of clicks.
document.addEventListener('click', function(){
    if (cardList.children.length > 0){
        clicks++;
        clickText.textContent = `Clicks: ${clicks}`;
    }
})

//FUNCTION TO ADD A CARD, the 'value' variable represents the text in the card.
//It's random whether or not the card is green or red.
const addCard = value => {
    let card = document.createElement('div');
    card.classList.add('card');
    if (Math.floor(Math.random() * 2) === 1){
        card.classList.add('active');
    } else {
        card.classList.add('inactive');
    }
    card.innerHTML = value;
    cardList.appendChild(card);
};

//FUNCTION TO BUILD A BOARD OF 12 CARDS WITH NAME 'STARTER'
const buildBoard = () => {
    for (let i=0; i<12; i++){
        addCard('STARTER');
    }
};
buildBoard();

//INTERVAL TO ADD CARDS
let interval = setInterval(function(){
    addCard(cardList.children.length + 1)
}, 2000);

//INTERVAL TO CHECK ENDGAME - if there are no cards in cardList
let checkInterval = setInterval(function(){
    if (cardList.children.length === 0) {
        clearInterval(interval);
        console.log('NO CARDS LEFT - ENDING GAME');
        clearInterval(checkInterval);

        userInterface.style.opacity = '1';
        userInterface.style.position = 'static';
        userInterface.style.width = '50%';
        resultText.textContent = 'All Done!';
    }
}, 250);

//IF THE cardList DIV is clicked, do these if statements
cardList.addEventListener('click', function(e){

    //Check if you clicked the board, but not the cards
    //Resets the combo since no red cards are clicked, excluding outside the cardList div.
    if (e.target.matches('.cardList')){
        combo = 1;
        comboText.textContent = 'Combo: 1.0x';
        console.log('No cards clicked');
        console.log('COMBO RESET TO 1.0x');
        console.log('----------');
        return
    } //else keep going, as you must have clicked a card.

    console.log('CLicked on ', e.target.textContent);
    //Check if the card is green, meaning that its active, then change it to red, meaning inactive.
    if (e.target.classList.contains('active')){
        e.target.classList.remove('active');
        e.target.classList.add('inactive');
        combo = 1;
        score += 5;
        comboText.textContent = 'Combo: 1.0x';
        scoreText.textContent = `Score: ${score}`;
        console.log('Green Card Clicked - Score: ', score);
        console.log('COMBO RESET TO 1.0x');
        console.log('----------');
        return //It does not continue the function.
    }

    //AT THIS POINT, WE ASSUME A RED CARD HAS BEEN CLICKED.
    //Clicking red cards increase the score by 10 times your combo.
    //Clicking a bunch of red cards in a row increases combo by 1x.
    if (e.target.classList.contains('inactive')) {
        score += 10 * combo;
        scoreText.textContent = `Score: ${score}`;
        combo++;
        comboText.textContent = `Combo: ${combo}.0x`;
        console.log('Red Card Clicked - Score: ', score);
        console.log('Combo: ', combo);

        let numChildren = cardList.children.length - 1;
        setTimeout(function () {
            e.target.remove();
        }, 500);

        console.log('Cards Left: ', numChildren);
        console.log('----------');
        if (numChildren <= 1) {
            clearInterval(interval);
        }
    }
    //This was added along with an if statement earlier, to prevent a bug that gives you multiple points for
    //clicking a fading red card.
    e.target.style.opacity = '0';
    e.target.style.backgroundColor = '#df2935';
    e.target.style.color = 'black';
    e.target.classList.remove('inactive');
});
