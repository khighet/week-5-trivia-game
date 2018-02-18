
// setTimeout(startTimer);
// setTimeout(thirtySeconds, 1000 * 30);
// setTimeout(timeUp, 1000 * 60);

// function startTimer() {
//   $("#time-left").append("<h2>Start<br>You have 1 minute!</h2>")
//   console.log("Start Game");
// }

// function thirtySeconds() {

//   $("#time-left").append("<h2>About 30 Seconds Left</h2>");
//   console.log("30 Seconds Left");
// }

// function timeUp() {
//   $("#time-left").append("<h2>Time's Up!</h2>");
//   console.log("time is up");

//   // audio.play();
// }

var count = 60;

var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

function timer()
{
  count = count-1;
  if (count <= 0)
  {
     clearInterval(counter);
     //counter ended, do something here
     return;
  }

  //Do code for showing the number of seconds here
  function timer()
{
  count=count-1;
  if (count <= 0)
  {
     clearInterval(counter);
     return;
  }

 $("#timer").html(count + " secs"); 
}

}

timer();
  console.log(timer);
    

(function() {
  const myQuestions = [
    {
      question: "What item of clothing did both Ross and his date wear out to dinner?",
      answers: {
        a: "A Belt",
        b: "A Jacket",
        c: "A Shirt"
      },
      correctAnswer: "c"
    },
    {
      question: "What did Joey buy Chandler as a token of their friendship, which Chandler hated?",
      answers: {
        a: "A Duck",
        b: "A Sweater",
        c: "A Bracelet"
      },
      correctAnswer: "c"
    },
    {
      question: "Why did Joey carry a murse (a man purse)?",
      answers: {
        a: "For an Acting Audition",
        b: "To Impress a Girl",
        c: "To annoy Chandler",
      },
      correctAnswer: "a"
    },
    {
      question: "In what order do the characters appear in the opening credits?",
      answers: {
        a: "Monica, Rachel, Phoebe, Chandler, Joey, Ross",
        b: "Rachel, Monica, Phoebe, Joey, Chandler, Ross",
        c: "Ross, Joey, Monica, Phoebe, Rachel, Chandler",
      },
      correctAnswer: "b"
    },
    {
      question: "What did the duck eat that made him sick?",
      answers: {
        a: "Nutter Butter",
        b: "An Engagement Ring",
        c: "Rachel's Face Cream",
      },
      correctAnswer: "c"
    },
  ];

  function buildQuiz() {

    const output = [];
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];
      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {

        numCorrect++;


        answerContainers[questionNumber].style.color = "lightgreen";
      } else {

        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }


  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 30;
  generateHTML();
  timerWrapper();
}

  var quizContainer = document.getElementById("quiz");
  var resultsContainer = document.getElementById("results");
  var submitButton = document.getElementById("submit");

  buildQuiz();

  // var startButton = document.getElementById("start");
  var previousButton = document.getElementById("previous");
  var nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // startButton.addEventListener("click", startGame);
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();