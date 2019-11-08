$(document).ready(function () {
  /****************************
  FIREBASE
  ****************************/
  // Firebase Configuration
  var config = {
    apiKey: "AIzaSyBnU7Zq6CmOii6hEHnrzFbrJqKKJ2i_t9U",
    authDomain: "mental-health-tracker-f579d.firebaseapp.com",
    databaseURL: "https://mental-health-tracker-f579d.firebaseio.com",
    projectId: "mental-health-tracker-f579d",
    storageBucket: "mental-health-tracker-f579d.appspot.com",
    messagingSenderId: "390219052736",
    appId: "1:390219052736:web:24d86ce5417805b74a5f25"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  // set up authentication and database
  const auth = firebase.auth();
  const database = firebase.database();
  // Firebase watcher + initial loader
  database.ref().on("child_added", function (childSnapshot) {
    // TEST
    // console.log(childSnapshot.val().mood);
    // console.log(childSnapshot.val().ansQ1);
    // console.log(childSnapshot.val().ansQ2);
    // console.log(childSnapshot.val().ansQ3);

    // add new table row
    var tr = $("<tr>");
    tr.append($("<td><a id='modal-trigger' href='#'>" + childSnapshot.val().currentDate + "</a></td>"));
    console.log(childSnapshot.val().currentDate);
    tr.append($("<td style='background-color:" + childSnapshot.val().color + "'>" + childSnapshot.val().mood + "</td>"));
    console.log(childSnapshot.val().mood);
    $("#tracker-table").append(tr);
    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

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

  // get current date
  var currentDate = moment().format("MMMM Do, YYYY");
  console.log("Today is: " + currentDate);
  var mood = "";
  var color = "";
  var ansQ1 = "";
  var ansQ2 = "";
  var ansQ3 = "";
  var comment = "";

  /****************************
  FUNCTIONS
  ****************************/
  function displayDate() {
    $("#display-date").text(currentDate);
  }

  function displayDailySummary() {
    // access database ???
    $("#answer-1").text(ansQ1);
    $("#answer-2").text(ansQ2);
    $("#answer-3").text(ansQ3);
    $("#display-comments-overview").text(comment);
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
  ADD ENTRY MODAL
  ****************************/
  // display modal
  $(document).on("click", "#add-entry-btn", function () {
    $(".ui.modal").modal("show");
    // $(".ui.modal").css("display", "block");
  });
  // display current date
  displayDate();
  // display questions
  displayQuestions();

  // select a mood
  $(document).on("click", ".mood", function (event) {
    mood = $(this).attr("data-mood");
    color = $(this).attr("data-color");
    $(this).addClass("button-clicked");
    // TEST
    console.log("selected mood: " + mood + ", " + color);
    // store in database
    return mood, color
  });
  // select answer #1
  $(document).on("click", ".answer-opt-1", function (event) {
    ansQ1 = $(this).attr("data-text");
    $(this).addClass("answer-selected");
    // TEST
    console.log("selected answer #1: " + ansQ1);
    return ansQ1
  });
  // select answer #2
  $(document).on("click", ".answer-opt-2", function (event) {
    ansQ2 = $(this).attr("data-text");
    $(this).addClass("answer-selected");
    // TEST
    console.log("selected answer #2: " + ansQ2);
    return ansQ2
  });
  // select answer #3
  $(document).on("click", ".answer-opt-3", function (event) {
    ansQ3 = $(this).attr("data-text");
    $(this).addClass("answer-selected");
    // TEST
    console.log("selected answer #3: " + ansQ3);
    return ansQ3
  });

  // send form off and redirect user
  $("#continue-btn").on("click", function (event) {
    // keep from sending off somewhere
    event.preventDefault();

    // comments can be added
    comment = $("#userComment").val().trim();

    // TEST
    console.log("mood stored in database: " + mood);
    console.log("color for mood: " + color);
    console.log("answer #1 stored in database: " + ansQ1);
    console.log("answer #1 stored in database: " + ansQ2);
    console.log("answer #1 stored in database: " + ansQ3);
    console.log("user comments: " + comment);

    // store user selection and input
    // push to firebase database
    database.ref().push({
      currentDate: currentDate,
      mood: mood,
      color: color,
      ansQ1: ansQ1,
      ansQ2: ansQ2,
      ansQ3: ansQ3,
      comment: comment,
      timeAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // redirect user
    window.location.replace("overview.html");
  });

  /****************************
  OVERVIEW
  ****************************/
  /****************************
  DAILY SUMMARY MODAL
  ****************************/
  // when date is clicked, open summary modal
  $(document).on("click", "#modal-trigger", function () {
    $("#summary-modal").css("display", "block");
    displayDailySummary();
  });
  // when close button is clicked, hide modal
  $("#close-btn").on("click", function () {
    $("#summary-modal").css("display", "none");
  });
});