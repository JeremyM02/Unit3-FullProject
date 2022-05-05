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

document.addEventListener('click', function(){
    if (cardList.children.length > 0){
        clicks++;
        clickText.textContent = `Clicks: ${clicks}`;
    }
})

const addCard = value => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('active');
    card.innerHTML = value;
    cardList.appendChild(card);
};

const buildBoard = () => {
    for (let i=0; i<12; i++){
        addCard('STARTER');
    }
};

buildBoard();

let interval = setInterval(function(){
    addCard(cardList.children.length + 1)
}, 2000);

let checkInterval = setInterval(function(){
    if (cardList.children.length === 0) {
        clearInterval(interval);
        console.log('NO CARDS LEFT - ENDING GAME');
        clearInterval(checkInterval);

        userInterface.style.opacity = 1;
        userInterface.style.position = 'static';
        userInterface.style.width = '50%';
        resultText.textContent = 'All Done!';
    }
}, 250);

cardList.addEventListener('click', function(e){
    console.log('CLicked on ', e.target.textContent);
    if (e.target.matches('.cardList')){
        return
    }

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
        return
    }

    //AT THIS POINT, A CARD HAS BEEN CLICKED.
    e.target.style.opacity = 0;

    score += 10 * combo;
    scoreText.textContent = `Score: ${score}`;
    combo++;
    comboText.textContent = `Combo: ${combo}.0x`;
    console.log('Score: ', score);
    console.log('Combo: ', combo);

    let numChildren = cardList.children.length - 1;
    setTimeout(function(){
        e.target.remove();
    }, 500);

    console.log('Cards Left: ', numChildren);
    console.log('----------');
    if (numChildren <= 1){
        clearInterval(interval);
    }

});
