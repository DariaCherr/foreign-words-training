"use strict";

const words = [{
        eng: "autumn",
        rus: "осень",
        example: "When autumn comes the birds fly to the south.",
    },
    {
        eng: "dream",
        rus: "мечта",
        example: "Yet this was just another dream.",
    },
    {
        eng: "love",
        rus: "любовь",
        example: "You're either in love, or you're not in love.",
    },

    {
        eng: "home",
        rus: "дом",
        example: "And then we went home.",
    },

    {
        eng: "travel",
        rus: "путешествовать",
        example: "I'm going to travel.",
    },

    {
        eng: "food",
        rus: "еда",
        example: "Your cat wants more food.",
    },

    {
        eng: "music",
        rus: "музыка",
        example: "We should have some music.",
    }
];

const flipCard = document.querySelector('.flip-card');
const cardFront = document.querySelector('#card-front');
const cardBack = document.querySelector('#card-back');
const buttonBack = document.querySelector('#back');
const buttonNext = document.querySelector('#next');
const currentWord = document.querySelector("#current-word");
const englishWord = document.querySelector("#card-front h1");
const russianWord = document.querySelector("#card-back div h1");
const exampleWord = document.querySelector("#card-back div p span");

flipCard.addEventListener('click', function() {
    flipCard.classList.toggle('active');
})

let i = 1;

function addWord() {
    englishWord.textContent = (words[i - 1]["eng"]);
    russianWord.textContent = (words[i - 1]["rus"]);
    exampleWord.textContent = (words[i - 1]["example"]);
}
addWord();


buttonNext.addEventListener("click", function() {
    if (i < 7) {
        currentWord.textContent = ++i;
    }
    if (i > 1) {
        buttonBack.disabled = false;
    }
    if (i > 6) {
        buttonNext.disabled = true;
    }
    addWord();
})

buttonBack.addEventListener("click", function() {
    if (i > 1) {
        currentWord.textContent = --i;
    }
    if (i < 2) {
        buttonBack.disabled = true;
    }
    if (i < 7) {
        buttonNext.disabled = false;
    }
    addWord();
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


const exam = document.querySelector('#exam');
const examCards = document.querySelector("#exam-cards");

exam.addEventListener("click", () => {
    flipCard.hidden = true;
    document.querySelector("#exam-mode").classList.remove("hidden");
    document.querySelector("#study-mode").hidden = true;
    document.querySelector(".slider-controls").hidden = true;
    addExamCards();

    const cards = document.querySelectorAll("#exam-cards div");

    cards.forEach(card => {
        card.style.order = getRandomInt(cards.length);
    });
})

function addExamCards() {
    const fragment = new DocumentFragment();
    for (let i = 0; i < words.length; i++) {
        const element = document.createElement('div');
        element.classList.add('card');
        element.textContent = words[i].eng;
        examCards.append(element);

        const element2 = document.createElement('div');
        element2.classList.add('card');
        element2.textContent = words[i].rus;
        examCards.append(element2);
    }
    document.body.append(fragment);
}

let firstWord;
let secondWord;
let click = true;

examCards.addEventListener("click", function(event) {
    const target = event.target;
    if (click) {
        click = false;
        firstWord = target;
        firstWord.classList.add("correct");
    } else {
        secondWord = target;
        if (words[firstWord.textContent] === secondWord.textContent || words[secondWord.textContent] === firstWord.textContent) {
            secondWord.classList.add("correct");
            firstWord.classList.add("fade-out");
            secondWord.classList.add("fade-out");
        } else {
            secondWord.classList.add("wrong");
            setTimeout(() => {
                firstWord.classList.remove("correct");
                secondWord.classList.remove("wrong");
            }, 500)
        }
        click = true;
    }
});

// if () {
// alert('Поздравляем! Вы успешно завершили проверку');
// }