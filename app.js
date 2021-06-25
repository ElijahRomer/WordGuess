console.log('If this is logged, then app.js is linked correctly');
 
// As a user, I want to start the game by clicking on a button.

//******START GAME BUTTON event listener
console.log(document.querySelector('.end-screen').firstChild)
let mainMenuEl = document.querySelector('.main-menu');
let gameScreenEl = document.querySelector('.game-screen');
let endScreenEl = document.querySelector('.end-screen');
let winsEl = document.querySelector('#wins');
let lossesEl = document.querySelector('#losses'); 
// let possibleWords = ['Challenge', 'Awesome', 'Programming', 'Photograph', 'Skydiving', 'Parachute'];
// let possibleWords = ['Skydiving'];
let possibleWords = ['a'];
// let possibleWords = ['objectivization'];
// let acceptableLetters = ['a', 'b']
let slotHTMLCollection;
let lettersGuessed;
let incorrectLettersGuessed;
let guessesLeftEl = document.querySelector('.guesses-left')
let numberOfGuesses = 6;
let acceptableGuessLettersArray = createAcceptableGuessLettersArray();
let numberOfLetterSlots;
let numberOfMatches;
let totalNumberOfGuesses;
let timerMechanism;
let timeLeft;
let numberOfWins;
let numberOfLosses;

//start button event listener
document.querySelector('#start-game').addEventListener('click', startGame);

//return to main menu event listener
document.querySelector('.return-main-menu').addEventListener('click', returnToMainMenuAnimation);

//retrieve previous scores from localStorage
document.addEventListener('DOMContentLoaded', loadScores)

function loadScores(){
  console.log('LOAD SCORES FIRED');
  if (localStorage.getItem('wins')){
    console.log(`localStorage has wins`)
  } else {
    numberOfWins = 0;
    winsEl.textContent = numberOfWins;
  }
  if (localStorage.getItem('losses')){
    console.log(`localStorage has losses recorded`)
  } else {
    numberOfLosses = 0;
    lossesEl.textContent = numberOfLosses;
  }
}

//create acceptable guess array
function createAcceptableGuessLettersArray(){
  let lowerCaseCodeArray = Array.from(Array(26)).map(
      (element, index) => {
      return index + 97
  });
  let upperCaseCodeArray = Array.from(Array(26)).map(
      (element, index) => {
      return index + 65
  });
  let allAcceptableLetterCodes = lowerCaseCodeArray.concat(upperCaseCodeArray);

  let alphabetArray = allAcceptableLetterCodes.map(element => {
      return String.fromCharCode(element);
  })
  // console.log(alphabetArray);
  return alphabetArray;
};



function guessCheck(eventObject){
    console.log('%cGUESSCHECK FIRED', 'color:red')
  let keyPressed = eventObject.key;
    console.log(`The key pressed was ${keyPressed}`)
    console.log(`The letters already guessed are "${lettersGuessed}"`)
  let numberOfMatchesThisIteration = 0;
  
  if (!acceptableGuessLettersArray.includes(keyPressed)){
    console.log(`${keyPressed} IS NOT A VALID GUESS.`)
  } else if (lettersGuessed.includes(keyPressed)){
    console.log(`You have already guessed ${keyPressed}.`)
  } else {
  for (let i = 0; i < slotHTMLCollection.length; i++){
    if (slotHTMLCollection[i].classList.contains(keyPressed)){
      slotHTMLCollection[i].value = keyPressed;
      numberOfMatchesThisIteration++
      } 
    }
    lettersGuessed.push(keyPressed);
  }
      console.log(`The number of matches for that guess was ${numberOfMatchesThisIteration}`);
    numberOfMatches += numberOfMatchesThisIteration;

      console.log(`The letters already guessed have been updated to: "${lettersGuessed}".`)
      console.log(`The number of matches total is ${numberOfMatches}`)


  if (numberOfMatchesThisIteration === 0){
    invalidGuess(keyPressed);
  }

    if (numberOfMatchesThisIteration > 0){
    gameWinCheck(numberOfMatches);
  }
}

function gameWinCheck (numberOfMatches) {
  console.log(`%cGAMEWINCHECK FIRED.`, 'color:limegreen')
  if (numberOfMatches == numberOfLetterSlots){
    console.log('WIN REGISTERED!')
    gameEnd('win');
  } else {
    return;
  }
};

function invalidGuess(keyPressed){
    console.log('%cINVALIDGUESS FIRED', 'color:orange');
    console.log(`Invalid guess of ${keyPressed}`);
  let lettersGuessedEl = document.querySelector('.letters-guessed');
  if (incorrectLettersGuessed.includes(` ${keyPressed}`)) {
    console.log(`You have already guessed ${keyPressed}.`);
  } else if(numberOfGuesses === 0){
    gameEnd('guessLoss');
  } else {
  numberOfGuesses--;
  guessesLeftEl.textContent = numberOfGuesses;
  incorrectLettersGuessed.push(` ${keyPressed}`);
  lettersGuessedEl.textContent = incorrectLettersGuessed;
  }
}

async function startGame() {
  console.log('STARTGAME FIRED');
  
  resetGameValues();
  document.addEventListener('keypress', guessCheck);
    var word = wordSelector().toLowerCase();
    console.log(`At Start Game: Word Selector Function chose: ${word}`); 
    slotHTMLCollection = createWordSlots(word);
    guessesLeftEl.textContent = numberOfGuesses
  assignEachWordSlotAValidLetter(word, slotHTMLCollection);
  await transitionAnimation(mainMenuEl, gameScreenEl);
  timerStart();
  clearStats();
};

function resetGameValues() {
  console.log('RESET GAME VALUES FIRED')
  numberOfMatches = 0;
  totalNumberOfGuesses = 0;
  lettersGuessed = [];
  incorrectLettersGuessed = [];
  timeLeft = 60;
  console.log(slotHTMLCollection);
  if(slotHTMLCollection){
    for (let i = 0; i < slotHTMLCollection.length; i++){
      slotHTMLCollection[i].remove();
    }
    console.log(slotHTMLCollection);
  }
}

function timeout(fn, ms){
  console.log('TIMEOUT FIRED')
  return new Promise(resolve => setTimeout(()=> {
    // console.log('timer finished, executing function')
    fn();
    // console.log('function executed, resolving promise')
    resolve();
    // console.log('Promise resolved.')
  }, ms));
}

async function transitionAnimation(currentElement, nextElement){
  console.log('TRANSITIONANIMATION FIRED')
  currentElement.classList.add('hidden');
  await timeout(function(){
    currentElement.style.display = 'none';
    currentElement.classList.remove('hidden');
    nextElement.style.display = 'flex';
    nextElement.classList.add('reveal');
  }, 700)
  await timeout(function(){
    nextElement.classList.remove('reveal');
    console.log('reveal class removed from nextElement')
  }, 700)
}



function timerStart(){
  console.log('TIMERSTART FIRED')
   let timeRemainingEl = document.querySelector('.time-remaining');
  //  timeLeft = 60;
   timerMechanism = setInterval(() => {
     if (timeLeft <= 0){
        clearInterval(timerMechanism);
        gameEnd('timeLoss');
     } else {
        timeLeft--;
        timeRemainingEl.textContent = timeLeft;
     }
   }, 100);
}



function wordSelector(){
  console.log('WORDSELECTOR FIRED')
  return possibleWords[Math.floor(Math.random() * possibleWords.length)];
}


function createWordSlots(word){
  console.log('CREATEWORDSLOTS FIRED')
  numberOfLetterSlots = word.length;
  console.log(`The length of the chose word is ${numberOfLetterSlots}.`);
  for (let i = 0; i < numberOfLetterSlots; i++){
    let slot = document.createElement('input');
    slot.classList.add('letter-slot');
    slot.value = ' ';
    slot.setAttribute('maxlength', '1');
    slot.readOnly = true;
    document.querySelector('.word-slots').append(slot);
  }
  let slotHTMLCollection = document.getElementsByClassName('letter-slot');
  // console.log(slotHTMLCollection);
  return slotHTMLCollection;
}

function assignEachWordSlotAValidLetter(word, slotHTMLCollection) {
  console.log('ASSIGNEACHWORDSLOTAVALIDLETTER FIRED')
  let currentWordLettersArray = word.split('');

  currentWordLettersArray.forEach((letter, i) => {
    slotHTMLCollection[i].classList.add(letter);
    slotHTMLCollection[i].classList.add(letter.toUpperCase());
  })
  // console.log(slotHTMLCollection);
  return slotHTMLCollection;
}


async function gameEnd(gameEndState){
  console.log('%cGAMEEND FIRED', 'color:limegreen')
  let endScreenTitle = document.querySelector('.end-screen').firstChild.nextSibling;
  updateScore(gameEndState);
  if(gameEndState === 'win'){
    endScreenTitle.textContent = `You WON! You guessed all the letters correctly within the allowed timeframe.`;
      clearInterval(timerMechanism);
      displayStats();
   
      await transitionAnimation(gameScreenEl, endScreenEl);
  } else if(gameEndState === 'guessLoss') {
      endScreenTitle.textContent = `Game Over! You ran out of guesses.`;
      await transitionAnimation(gameScreenEl, endScreenEl);
  } else if(gameEndState === 'timeLoss'){
      endScreenTitle.textContent = `Game Over! The Timer ran out.`;
      await transitionAnimation(gameScreenEl, endScreenEl);
  }
}

function clearStats(){
  console.log(`CLEAR STATS FIRED`)
  let statsElContent = document.getElementsByClassName('stats')[0].children;
  console.log(statsElContent)
  console.log(`the number of stats in the stats end game element is ${statsElContent.length}.`)
  if (statsElContent.length > 0){
    console.log('statsElContent has items')
    for (let i = (statsElContent.length - 1); i >= 0; i--){
      statsElContent[i].remove();
    }
  };
  console.log(statsElContent)
  // statsElContent.forEach(stat => {
  //   stat.remove()
  //   }
  // )
};
clearStats();

function displayStats() {
  let stats = document.querySelector('.stats');
  let timeLeftEndEl = document.createElement('p');
  timeLeftEndEl.textContent = `You had ${timeLeft} second(s) left.`;
    console.log(`${timeLeftEndEl}`);
  let guessesLeftEndEl = document.createElement('p');
  guessesLeftEndEl.textContent = `You had ${numberOfGuesses} guesses left.`;
    console.log(`${guessesLeftEndEl}`);
  stats.appendChild(timeLeftEndEl);
  stats.appendChild(guessesLeftEndEl);
    console.log(`You had ${timeLeft} second(s) left.`)
}

async function returnToMainMenuAnimation(){
  await transitionAnimation(endScreenEl, mainMenuEl)
}

function updateScore(gameEndState){
  if(gameEndState === 'win'){
    numberOfWins++;
    winsEl.textContent = numberOfWins;
  } else {
    numberOfLosses++;
    winsEl.textContent = numberOfLosses;
  }
}



// As a user, I want to try and guess a word by filling in a number of blanks that match the number of letters in that word.

//********Input fields appended via loop, quantity modulated by the length of the word (one for each letter)
//******** pressing a key that is not in the array will not add it to the input field, and will subtract one from guesses
//******** possibly take the value of that key and include it in a HUD below so user can see what they have guessed. 

//******* make it draw a hangman????? HAHA Maybe


// As a user, I want the game to be timed.

//******timer with set interval function, if statements to control runout

// As a user, I want to win the game when I have guessed all the letters in the word.

//*****true false with all values and linked conditionals for each field with and statement to calculate win?
//***** modal appears for endGame displaying score and redirects to menu when clicked


// As a user, I want to lose the game when the timer runs out before I have guessed all the letters.
//*****if statement within the timer function

// As a user, I want to see my total wins and losses on the screen.
//*****HUD that appends and updates innerHTML/ text content of elements

//When a user presses a letter key, the user's guess should be captured as a key event.

//******Event listener that only targets letter keys and not others

//When a user correctly guesses a letter, the corresponding blank "_" should be replaced by the letter. For example, if the user correctly selects "a", then "a _ _ a _" should appear.

// ******take the string, split into array, iterate through array for each guess to check where it appears, record index number(s), populate into the corresponding input field on the screen. 

// When a user wins or loses a game, a message should appear and the timer should stop.

//*******handled through game end function, timer will end 

// When a user clicks the start button, the timer should reset.

//******handled by resetting the variable in the start button 

// When a user refreshes or returns to the brower page, the win and loss counts should persist.

//*******will persist the win and loss counts to localStorage. 







//Kyle Stein's answer

// function generatePassword() {
//   var lowerCharacters = ["a", "b", "c", "d", "e"];
//   var numCharacters = prompt("enter a number from 8 to 128");
//   let returnString = '';
//   console.log(numCharacters);
//   for(let i = 0; i < numCharacters; i++){
//     returnString += lowerCharacters[Math.floor(Math.random() * lowerCharacters.length)]
//   }
//   return returnString;
// }

// console.log(generatePassword());