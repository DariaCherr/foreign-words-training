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

const value = words.length;

buttonNext.addEventListener("click", function() {
    currentWord.textContent = ++i;
    if (i === value) {
        buttonNext.disabled = true;
    }
    addWord();
    buttonBack.disabled = false;
})


buttonBack.addEventListener("click", function() {
    currentWord.textContent = --i;
    if (i === value) {
        buttonBack.disabled = false;
    } else if (i === 1) {
        buttonBack.disabled = true;
    }
    addWord();
    buttonNext.disabled = false;
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const shuffleBtn = document.querySelector('#shuffle-words');

shuffleBtn.addEventListener("click", () => {
    shuffleCards(words);
    addWord();
})

function shuffleCards(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

const exam = document.querySelector('#exam');
const examCards = document.querySelector("#exam-cards");
const examTimer = document.querySelector("#time");
let timer;

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

    timer = setInterval(() => {
        let minutes = examTimer.textContent.split(":")[0];
        let seconds = examTimer.textContent.split(":")[1];
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (seconds < 10) {
            examTimer.textContent = minutes + `:0` + seconds;
        } else {
            examTimer.textContent = minutes + `:` + seconds;
        }
    }, 1000)
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

const dictionary = {
    "autumn": "осень",
    "dream": "мечта",
    "love": "любовь",
    "home": "дом",
    "travel": "путешествовать",
    "food": "еда",
    "music": "музыка",
}

const objLength = Object.keys(dictionary).length;

let firstWord;
let secondWord;
let click = true;
let counter = 0;

examCards.addEventListener("click", function(event) {
    const target = event.target;
    if (click) {
        click = false;
        firstWord = target;
        firstWord.classList.add("correct");
    } else {
        secondWord = target;
        if (dictionary[firstWord.textContent] === secondWord.textContent || dictionary[secondWord.textContent] === firstWord.textContent) {
            secondWord.classList.add("correct");
            firstWord.classList.add("fade-out");
            secondWord.classList.add("fade-out");
            counter++;
            setTimeout(() => {
                if (counter === objLength) {
                    clearInterval(timer);
                    alert('Поздравляем! Вы успешно завершили проверку');
                }
            }, 500);
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