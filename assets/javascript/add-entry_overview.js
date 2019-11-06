$(document).ready(function () {
  /****************************
  VARIABLES
  ****************************/
  var questions = [
    {
      question: "Do you feel hopeless?",
      answer1: "Yes, all the time.",
      answer2: "Yes, sometimes.",
      answer3: "No."
    },
    {
      question: "Did you getting less sleep than usual?",
      answer1: "Yes, I had trouble falling asleep.",
      answer2: "Yes, I kept waking up at night.",
      answer3: "No, I haven't noticed any differences."
    },
    {
      question: "Have you been productive today?",
      answer1: "Yes, I have kept myself busy.",
      answer2: "I only completed important tasks.",
      answer3: "No, I don't feel like leaving the house."
    }
  ]
  var ansQ1 = "";
  var ansQ2 = "";
  var ansQ3 = "";
  var comment = "";

  var currentDate = moment().format("MMMM Do, YYYY");
  console.log("Today is: " + currentDate);

  /****************************
  FUNCTIONS
  ****************************/
  function displayDate() {
    $("#display-date").text(currentDate);
  }
  function displayDailySummary() {
    $("#")
  }

  function displayQuestions() {
    $("#questionA").text(questions[0].question);
    $("#answer-1A").text(questions[0].answer1);
    $("#answer-2A").text(questions[0].answer2);
    $("#answer-3A").text(questions[0].answer3);

    $("#questionB").text(questions[1].question);
    $("#answer-1B").text(questions[1].answer1);
    $("#answer-2B").text(questions[1].answer2);
    $("#answer-3B").text(questions[1].answer3);

    $("#questionC").text(questions[2].question);
    $("#answer-1C").text(questions[2].answer1);
    $("#answer-2C").text(questions[2].answer2);
    $("#answer-3C").text(questions[2].answer3);
  }

  function displayCommentArea() {
    comment = $("#userComment").val().trim();
    console.log(comment);
  }

  /****************************
  EVENTS
  ****************************/
  $("#continue-btn").on("click", function (event) {
    // keep from sending off somewhere
    event.preventDefault();




  });

  /****************************
  MAIN CODE
  ****************************/
  // TEST
  // console.log(questions);

  displayDate();

  // display questions
  displayQuestions();

  // 

});