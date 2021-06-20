console.log('If this is logged, then app.js is linked correctly');
 
// As a user, I want to start the game by clicking on a button.

//******START GAME BUTTON event listener

let mainMenuEl = document.querySelector('.main-menu');
let gameScreenEl = document.querySelector('.game-screen');
let possibleWords = ['Challenge', 'Awesome', 'Programming', 'Photograph', 'Skydiving', 'Parachute'];
let slotHTMLCollection;

//start button event listener
document.querySelector('#start-game').addEventListener('click', startGame);
document.addEventListener('keypress', guessCheck)
//add keypress event listener

function guessCheck(eventObject){
  let keyPressed = eventObject.key;
  for (let i = 0; i < slotHTMLCollection.length; i++){
    if (slotHTMLCollection[i].classList.contains(keyPressed)){
      console.log(slotHTMLCollection[i])
      slotHTMLCollection[i].value = keyPressed;
    }

  }
  console.log(keyPressed);
}

function startGame() {
  console.log('Button Works!');
  transitionAnimation();
    var word = wordSelector().toLowerCase();
    console.log(word); 
    slotHTMLCollection = createWordSlots(word);
  assignEachWordSlotAValidLetter(word, slotHTMLCollection);
  console.log(slotHTMLCollection);
};



function transitionAnimation(){
  mainMenuEl.classList.add('hidden');
  setTimeout(function(){
    mainMenuEl.style.display = 'none';
    mainMenuEl.classList.remove('hidden');
    gameScreenEl.style.display = 'flex';
    gameScreenEl.classList.add('reveal');
    setTimeout(function(){
      gameScreenEl.classList.remove('reveal');
    }, 700)
  }, 700)
}



function wordSelector(){
  return possibleWords[Math.floor(Math.random() * possibleWords.length)];
}


function createWordSlots(word){
  let numberOfLetterSlots = word.length;
  console.log(numberOfLetterSlots);
  for (let i = 0; i < numberOfLetterSlots; i++){
    let slot = document.createElement('input');
    slot.classList.add('letter-slot');
    slot.textContent = '_';
    slot.setAttribute('maxlength', '1');
    slot.readOnly = true;
    // if(i === 0) {
    //   slot.readOnly = false;
    //   slot.style.backgroundColor = 'limegreen';
    // };
    document.querySelector('.word-slots').append(slot);
  }
  let slotHTMLCollection = document.querySelectorAll('.letter-slot');
  console.log(slotHTMLCollection);
  return slotHTMLCollection;
}

function assignEachWordSlotAValidLetter(word, slotHTMLCollection) {
  let currentWordLettersArray = word.split('');
  console.log(currentWordLettersArray);
  console.log(slotHTMLCollection);
  currentWordLettersArray.forEach((letter, i) => {
    slotHTMLCollection[i].classList.add(letter);
  })
  console.log(slotHTMLCollection);
  return slotHTMLCollection;
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