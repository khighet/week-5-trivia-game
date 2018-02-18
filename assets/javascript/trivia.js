$(document).ready(function() {
  var qaArray, right, wrong, unanswered, currentIndex, timeIsUp;

  var questionTimer = {
    time: 30,

    reset: function () {
          questionTimer.time = 30;
      },
      start: function(){
        $('#time').html("Time Remaining: " + questionTimer.time).css("color", "black");;
          counter = setInterval(questionTimer.count, 1000);
      },
      stop: function(){
          clearInterval(counter);
      },
      count: function(){
            questionTimer.time--;
          $('#time').html("Time Remaining: " + questionTimer.time);

          if(questionTimer.time < 6) {  //warning flashing starts
            if(questionTimer.time % 2 == 0) {
              $('#time').css("color", "#EBFFE3"); //Whiteyellow
            } else {
              $('#time').css("color", "#E8867D"); //Redpink
            }
          }
      },
  }

  function varSet() {
    qaArray = [{
      question: "What item of clothing did both Ross and his date wear out to dinner?",
      answers: ["A Belt", "A Jacket", "A Shirt", "A Hat"],
      picright: 'assets/images/Fat_Monica.jpg',
      picwrong: 'assets/images/18-important-life-lessons-phoebe-taught-on-us-on--2-27858-1441073280-0_dblbig.jpg',
      correctanswer: 2
    }, {
      question: "What did Joey buy Chandler as a token of their friendship, which Chandler hated?",
      answers: ["A Duck", "A Sweater", "A Bracelet", "A Dog Statue"],
      picright: 'assets/images/b656bfc523eae5b2eab1ff5c08352b37.jpg',
      picwrong: 'assets/images/18-important-life-lessons-phoebe-taught-on-us-on--2-27858-1441073280-0_dblbig.jpg',
      correctanswer: 2
    }, {
      question: "Why did Joey carry a murse (a man purse)?",
      answers: ["He Liked It", "Rachelle Told Him Too", "For An Audition", "All of The Above"],
      picright: 'assets/images/rachel.jpg',
      picwrong: 'assets/images/18-important-life-lessons-phoebe-taught-on-us-on--2-27858-1441073280-0_dblbig.jpg',
      correctanswer: 3
    },  {
      question: "What did the duck eat that made him sick?",
      answers: ["Nutter Butter", "Soap", "An Engagement Ring", "Rachel's Face Cream"],
      picright: 'assets/images/b689c3ac6e670f87a0aa3adc55acf5c00391517a.jpg',
      picwrong: 'assets/images/18-important-life-lessons-phoebe-taught-on-us-on--2-27858-1441073280-0_dblbig.jpg',
      correctanswer: 3
    }];

    right = 0;
    wrong = 0;
    unanswered = 0;

    currentIndex = -1;  //Starts at -1 because advance automatically increases it by 1 so it will start at 0

    $('#question').html("<button class='btn' id='start'>Start</button>")
    $('#answer0, #answer1, #answer2, #answer3').hide().off('click');

    $('#start').on("click", function() {
      advance();
    });
  }

  function askQuestions() {
    questionTimer.start();
    $('#question').html(qaArray[currentIndex].question);
    $('#answer0').show().html(qaArray[currentIndex].answers[0]);
    $('#answer1').show().html(qaArray[currentIndex].answers[1]);
    $('#answer2').show().html(qaArray[currentIndex].answers[2]);
    $('#answer3').show().html(qaArray[currentIndex].answers[3]);
    $('#pictureHolder').hide().off('click');

    onClickAnswer();
  }

  function onClickAnswer() {
    $('.btn').on("click", function() {
      var buttonClick = parseInt($(this).attr('value'));
      if(buttonClick === qaArray[currentIndex].correctanswer) {
        rightAnswer();
      }
      else {
        wrongAnswer();
      }
    });
  }

  function rightAnswer() {
    clearTimeout(timeIsUp);
    right++;
    questionTimer.stop();
    questionTimer.reset();
    $('#time').empty();
    $('#question').html("<h2>Correct!</h2><br>");
    $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
    $('#pictureHolder').show().html("<img class='pics' src=" + qaArray[currentIndex].picright + ">");

    timeIsUp = setTimeout(advance, 4 * 1000);
  }

  function wrongAnswer() {
    clearTimeout(timeIsUp);
    wrong++;
    questionTimer.stop();
    questionTimer.reset();
    $('#time').empty();
    $('#question').html("<h2>Nope!</h2><br>");
    $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
    $('#pictureHolder').show().html("The correct answer was: " + qaArray[currentIndex].answers[qaArray[currentIndex].correctanswer] +
      "<br><img class='pics' src=" + qaArray[currentIndex].picwrong + ">");

    timeIsUp = setTimeout(advance, 4 * 1000);
  }

  function timesUp() {
    clearTimeout(timeIsUp);
    unanswered++;
    questionTimer.stop();
    questionTimer.reset();
    $('#time').empty();
    $('#question').html("<h2>Time's Up!</h2>");
    $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
    $('#pictureHolder').show().html("The correct answer was: " + qaArray[currentIndex].answers[qaArray[currentIndex].correctanswer] +
      "<br><img class='pics' src=" + qaArray[currentIndex].picwrong + ">");

    timeIsUp = setTimeout(advance, 4 * 1000);
  }

  function endScreen() {
    $('#time').html("<h2>Good job!</h2>");
    $('#question').html("Your results <br><br>Right: " + right + "<br>Wrong: " + wrong + "<br>Not Answered: " + unanswered);

    $('#pictureHolder').html("<button class='btn' id='playagain'>Play again?</button>")

    $('#playagain').on("click", function() {
      varSet();
      advance();
    });
  }

  function advance() {
    currentIndex++;

    if(currentIndex < qaArray.length) {
      askQuestions();
      timeIsUp = setTimeout(timesUp, 30 * 1000);
    } else {
      endScreen();
    }
  }


  varSet();

});