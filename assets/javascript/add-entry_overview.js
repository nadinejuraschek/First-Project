$(document).ready(function () {
  /****************************
  VARIABLES
  ****************************/
  var questions = [
    {
      question: "Do you feel hopeless?",
      answer1: "Yes, all the time.",
      answerText1: "I feel hopeless all the time.",
      answer2: "Yes, sometimes.",
      answerText2: "I feel hopeless sometimes.",
      answer3: "No.",
      answerText3: "I feel hopeful."
    },
    {
      question: "Did you getting less sleep than usual?",
      answer1: "Yes, I had trouble falling asleep.",
      answerText1: "I have trouble falling asleep.",
      answer2: "Yes, I kept waking up at night.",
      answerText2: "I keep waking up at night.",
      answer3: "No, I haven't noticed any differences.",
      answerText3: "My sleeping habits are normal."
    },
    {
      question: "Have you been productive today?",
      answer1: "Yes, I have kept myself busy.",
      answerText1: "I am productive.",
      answer2: "I only completed important tasks.",
      answerText2: "I only complete necessary tasks.",
      answer3: "No, I don't feel like leaving the house.",
      answerText3: "I have trouble leaving the house."
    }
  ]
  // var mood = "";
  // var ansQ1 = "";
  // var ansQ2 = "";
  // var ansQ3 = "";
  // var comment = "";

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
    $("#answer-1A").attr("data-text", questions[0].answerText1);
    $("#answer-2A").text(questions[0].answer2);
    $("#answer-2A").attr("data-text", questions[0].answerText2);
    $("#answer-3A").text(questions[0].answer3);
    $("#answer-3A").attr("data-text", questions[0].answerText3);

    $("#questionB").text(questions[1].question);
    $("#answer-1B").text(questions[1].answer1);
    $("#answer-1B").attr("data-text", questions[1].answerText1);
    $("#answer-2B").text(questions[1].answer2);
    $("#answer-2B").attr("data-text", questions[1].answerText2);
    $("#answer-3B").text(questions[1].answer3);
    $("#answer-3B").attr("data-text", questions[1].answerText3);

    $("#questionC").text(questions[2].question);
    $("#answer-1C").text(questions[2].answer1);
    $("#answer-1C").attr("data-text", questions[2].answerText1);
    $("#answer-2C").text(questions[2].answer2);
    $("#answer-2C").attr("data-text", questions[2].answerText2);
    $("#answer-3C").text(questions[2].answer3);
    $("#answer-3C").attr("data-text", questions[2].answerText3);
  }

  /****************************
  EVENTS
  ****************************/
  $(document).on("click", ".mood", function (event) {
    var mood = $(this).attr("data-mood");
    $(this).addClass("button-clicked");
    // TEST
    console.log("selected mood: " + mood);
    // store in database
    return mood
  });
  $(document).on("click", ".answer-opt-1", function (event) {
    var ansQ1 = $(this).attr("data-text");
    $(this).addClass("answer-selected");
    // TEST
    console.log("selected answer #1: " + ansQ1);
  });
  $(document).on("click", ".answer-opt-2", function (event) {
    var ansQ2 = $(this).attr("data-text");
    $(this).addClass("answer-selected");
    // TEST
    console.log("selected answer #2: " + ansQ2);
  });
  $(document).on("click", ".answer-opt-3", function (event) {
    var ansQ3 = $(this).attr("data-text");
    $(this).addClass("answer-selected");
    // TEST
    console.log("selected answer #3: " + ansQ3);
  });
  $("#continue-btn").on("click", function (event) {
    // keep from sending off somewhere
    event.preventDefault();

    // store user selection and input

    // comments can be added
    comment = $("#userComment").val().trim();
    // TEST
    console.log("user comments: " + comment);

  });

  /****************************
  MAIN CODE
  ****************************/
  $(".ui.modal").modal("show");

  // TEST
  // console.log(questions);

  displayDate();

  // display questions
  displayQuestions();

  // 

});