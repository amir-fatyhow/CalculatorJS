let currentQuest = 0;

function askClickHandler(answer, ask) {
    if (answer) {
        answer.toLowerCase();
        for (let i = 0; i < ask.answers.length; i++) {
            if (answer === ask.answers[i].text) {
                currentQuest = ask.answers[i].goTo;
                return setQuest();
            }
        }

        if (ask.gameOver) {
            document.getElementById('question-title').innerHTML = 'Game over';
            document.getElementById('question-description').innerHTML = ask.gameOver;
            currentQuest = 0;
            setTimeout(setQuest, 3000);
        } else {
            currentQuest = ask.goToWrong;
            return setQuest();
        }
        
    }
}

function genAsk(ask) {
    let div = document.createElement('div');

    let span = document.createElement('span');
    span.classList.add('text');
    span.innerHTML = ask.question;

    let input = document.createElement('input');
    input.placeholder = 'answer';
    input.classList.add('input');

    let button = document.createElement('button');
    button.classList.add('button-go');
    button.innerHTML = 'GO';
    button.addEventListener('click', function() {
        askClickHandler(input.value, ask);
    });

    div.appendChild(span);
    div.appendChild(input);
    div.appendChild(button);
    document.getElementById('question-ask').appendChild(div);
}

function setQuest() {
    let question = quests[currentQuest];

    document.getElementById('question-title').innerHTML = question.title;
    document.getElementById('question-description').innerHTML = question.description;
    document.getElementById('question-image').src = question.image;


    document.getElementById('question-ask').innerHTML = '';
    for (let i = 0; i < question.asks.length; i++) {
        genAsk(question.asks[i]);
    }
}

setQuest();
