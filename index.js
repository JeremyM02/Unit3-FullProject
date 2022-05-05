const cardList = document.querySelector('.cardList');
const resultText = document.getElementById('result-text');

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

cardList.addEventListener('click', function(e){
    console.log(e.target);
    if (e.target.matches('.cardList')){
        return
    }

    if (e.target.classList.contains('active')){
        e.target.classList.remove('active');
        e.target.classList.add('inactive');
        return
    }
    e.target.style.opacity = 0;
    setTimeout(function(){
        e.target.remove();
    }, 500);

    let children = cardList.children;
    if (children.length <= 1){
        clearInterval(interval);
        console.log('good');
        resultText.textContent = 'All Done!';
    }
    console.log(children.length);
});

