let quests = [
    {
        title: 'Road',
        description: 'Do you want to start the journey?',
        image: 'img/direction.png',
        asks: [
            {
                question: 'Go?',
                answers: [{
                    text: 'yes',
                    goTo: 1
                },
                {
                    text: 'yea',
                    goTo: 1
                }],
                gameOver: 'You are arrived in dark hole'
            }
        ]
    },
    {
        title: 'Transport',
        description: 'You go and go so infinitely',
        image: 'img/drive.png',
        asks: [
            {
                question: 'Do you want to take the train?',
                answers: [{
                    text: 'yes',
                    goTo: 2
                }],
                goToWrong: 0
            }
        ]
    },
    {
        title: 'Barriers',
        description: 'You train has broken and you need to go on your feet',
        image: 'img/jump.png',
        asks: [
            {
                question: 'Do you jump far and high?',
                answers: [{
                    text: 'yes',
                    goTo: 3
                }],
                gameOver: 'You are arrived in dark hole'
            }
        ]

    },
    {
        title: 'Moon',
        description: 'You win',
        image: 'img/moon.png',
        asks: [
            {
                question: 'Do you want play again?',
                answers: [{
                    text: 'cool',
                    goTo: 0
                }],
                goToWrong: 0
            }
        ]
    }
];