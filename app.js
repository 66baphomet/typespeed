var mq = window.matchMedia( "(max-width: 1080px)" );
let characterNumber = 0;//tracks total number of characters pressed
let keyDownController = false;
let letterTracker;//keeps track of the current letter
let randomLetter;//presents random letters in the letter divs
let letter = document.querySelectorAll(".app div");

let lettersArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];
    // "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
function newLetters()
{    
    for(let i=0; i<4 ; i++)
    {
        randomLetter = Math.floor(Math.random() * 25);
        letter[i].innerText = lettersArray[randomLetter];
        letter[i].classList.remove("correct");
        letter[i].classList.remove("wrong");
    }
}

    let app = document.querySelector(".app");

    newLetters();

    letter = document.querySelectorAll(".app div");
    letterTracker = 0;
    //adds current class to the first letter when the page loads
    letter[letterTracker].classList.add("current");
    let currentLetterProceedController = true;

document.addEventListener("keydown", (e)=>{
if(mq.matches)
{
    //mobile specific part starts
    setTimeout(()=>{
                if(keyDownController)
                {
                //takes the key pressed from the text input area
                let pressedKey= document.querySelector("input").value.toLowerCase();
    
                if(pressedKey == letter[letterTracker].innerText)
                {
                    letter[letterTracker].classList.remove("current");
                    letter[letterTracker].classList.add("correct");
                    letterTracker++;
                    wrongLetterController = true;
                    characterNumber++;
                }
                else 
                {
                    letter[letterTracker].classList.remove("current");
                    letter[letterTracker].classList.add("wrong");
                    wrongLetterController = false;
                }
        
                if(letterTracker==4)
                {
                    newLetters();
                    letterTracker=0;
        
                }
        
                if(wrongLetterController)
                letter[letterTracker].classList.add("current");
    
                document.querySelector("input").value="";//empties the input text area
            }
            },0.000000000000000001);
            //mobile specific part ends

}
else{
      //pc specific part starts
      if(keyDownController)
      {
      let pressedKey = e.key;
      if(pressedKey == letter[letterTracker].innerText)
      {
          //indicates that the correct key was pressed
          letter[letterTracker].classList.remove("current");
          letter[letterTracker].classList.add("correct");
          //next letter is indicated by incrementing letterTracker
          letterTracker++;
          //allows the current letter to proceed 
          currentLetterProceedController = true;
          characterNumber++;
      }
      else 
      {
          //indicates that the wrong key was pressed
          letter[letterTracker].classList.remove("current");
          letter[letterTracker].classList.add("wrong");
          currentLetterProceedController = false;
      }

      //when all the keys were correctly pressed it updates the letters
      if(letterTracker==4)
      {
          newLetters();
          //the first letter is set as the current letter
          letterTracker=0;
      }

      //updates the current letter
      if(currentLetterProceedController)
        letter[letterTracker].classList.add("current");
      //pc specific part ends
}
    }
    })
//timerInterval keeps track of our 1 minute time limit
let timerInterval;
//timerController allows the timer to start once and prevent it from being executed multiple times
let timerController= true;

//gets executed when start button is clicked and starts the timer
function startTimer()
{
let timer = 60;
document.querySelector(".wpmcpm").style.visibility="hidden";
if(timerController)
{
    timerController = false;
    timerInterval = setInterval(()=>{
    if(timer > 0)
    {
        keyDownController=true;
        timer--;
        document.querySelector(".timer").innerText=timer;
        document.querySelector(".timerDiv").style.visibility="visible";
    }
    //if timer reaches 0 else block executes
    else 
    {
        keyDownController = false;
        timerController = true;
        document.querySelector(".cpm").innerText=characterNumber;
        document.querySelector(".wpm").innerText= (Math.round((characterNumber/4.7)*100)/100).toFixed(2);
        document.querySelector(".wpmcpm").style.visibility="visible";
        document.querySelector(".timerDiv").style.visibility="hidden";
        clearInterval(timerInterval);
        characterNumber=0;
        timer = 60;

        for(let i=0; i<4; i++)
        {
            letter[i].classList.remove("current");
        }

        letter[0].classList.add("current");
        letterTracker = 0;
        newLetters();
    }
},1000)
}
}
//executed when reset button is clicked
function stopTimer()
{
    timerController = true;
    characterNumber = 0;
    timer = 60;
    clearInterval(timerInterval);
    document.querySelector(".timerDiv").style.visibility="hidden";
    document.querySelector(".wpmcpm").style.visibility="hidden";
    letterTracker = 0;
    newLetters();
}