const gameInfoTemplate = (maxValue, attemptsLeft, totalPrize, currentPrize) => `
Enter a number from 0 to ${maxValue}
Attempts left: ${attemptsLeft}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${currentPrize}$
`;

const config = {
    prizeMultiplier: 3,
    rangeMultiplier: 2,
    totalAttempts: 3
};

// game rules shouldn't change during the game, so let's be safe and freeze config
Object.freeze(config);

const gameData = {
    prize: {
        1: 10,
        2: 5,
        3: 2
    },
    maxRangeValue: 5,
    totalPrize: 0
};

// flag, that determines, if user wants to continue
let playAgain = false;

if(confirm('Do you want to play a game?')){
    do {
        // reset flag to the default value
        playAgain = false;

        const randomNumber = getRandomNumber(gameData.maxRangeValue);

        for(let currentAttempt = 1; currentAttempt <= config.totalAttempts; currentAttempt++) {
            const userGuess = +prompt(
                gameInfoTemplate(
                    gameData.maxRangeValue,
                    config.totalAttempts - currentAttempt,
                    gameData.totalPrize,
                    gameData.prize[currentAttempt]
                )
            );

            if (userGuess === randomNumber) {
                updateTotalPrize(currentAttempt);
                if(confirm(`
                    Congratulation! Your prize is: ${gameData.totalPrize} 
                    Do you want to continue?`)) {
                        updatePrizes();
                        updateMaxRange();
                        playAgain = true;
                        break;
                }
            } else if (currentAttempt === config.totalAttempts) {
                alert(`Thank you for a game. Your prize is: ${gameData.totalPrize}$`);
            }
        }
    } while (playAgain);
}

alert('You did not become a millionaire, but can.');

function getRandomNumber(maxValue) {
    return Math.floor(Math.random() * ++maxValue);
}

function updateTotalPrize(currentAttempt) {
    gameData.totalPrize += gameData.prize[currentAttempt];
}

function updatePrizes() {
    gameData.prize['1'] *= config.prizeMultiplier;
    gameData.prize['2'] *= config.prizeMultiplier;
    gameData.prize['3'] *= config.prizeMultiplier;
}

function updateMaxRange() {
    gameData.maxRangeValue *= config.rangeMultiplier;
}
