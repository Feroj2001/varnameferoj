const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
// score container variables
const SaveScore = document.getElementById('#save-score')
const nameKeeper = document.getElementById('#name')
const yourName = document.getElementById('#user-name')
const yourScore = document.getElementById('#main-score')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    startTimer()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

var timeleft = 60;

function startTimer() {
    var downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("timer").innerHTML = "Finished";
        } else {
            document.getElementById("timer").innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
    }, 1000);
}

// score keeper section

// renderLastUser();


const questions = [{
        question: 'What is 8 - 4?',
        answers: [{
                text: '4',
                correct: true
            },
            {
                text: '22',
                correct: false
            }
        ]
    },
    {
        question: 'Who is the best YouTuber?',
        answers: [{
                text: 'Jake paul',
                correct: true
            },
            {
                text: 'KSI',
                correct: true
            },
            {
                text: 'Delirious',
                correct: true
            },
            {
                text: 'none',
                correct: true
            }
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [{
                text: 'Kinda',
                correct: false
            },
            {
                text: 'YES!!!',
                correct: true
            },
            {
                text: 'Um no',
                correct: false
            },
            {
                text: 'IDK',
                correct: false
            }
        ]
    },
    {
        question: 'What is 4 * 2?',
        answers: [{
                text: '6',
                correct: false
            },
            {
                text: '8',
                correct: true
            }
        ]
    }
]