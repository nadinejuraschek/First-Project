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
  // update database settings
  database.settings({ timestampsInSnapshots: true });
  // Firebase watcher + initial loader
  database.ref().on("child_added", function (childSnapshot) {
    // TEST
    // console.log(childSnapshot.val().mood);
    // console.log(childSnapshot.val().ansQ1);
    // console.log(childSnapshot.val().ansQ2);
    // console.log(childSnapshot.val().ansQ3);

    // add new table row
    // var tr = $("<tr class=''>");
    // tr.append($("<td>" + childSnapshot.val().trainName + "</td>"));
    // tr.append($("<td>" + childSnapshot.val().destination + "</td>"));
    // tr.append($("<td>" + childSnapshot.val().frequency + "</td>"));
    // tr.append($("<td>" + nextArrival + "</td>"));
    // tr.append($("<td>" + minutesAway + "</td>"));
    // $("#train-table").append(tr);
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

  /****************************
  FUNCTIONS
  ****************************/
  function displayDate() {
    $("#display-date").text(currentDate);
  }

  // function displayDailySummary() {
  //   $("#")
  // }

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
    return ansQ1
  });
  $(document).on("click", ".answer-opt-2", function (event) {
    var ansQ2 = $(this).attr("data-text");
    $(this).addClass("answer-selected");
    // TEST
    console.log("selected answer #2: " + ansQ2);
    return ansQ2
  });
  $(document).on("click", ".answer-opt-3", function (event) {
    var ansQ3 = $(this).attr("data-text");
    $(this).addClass("answer-selected");
    // TEST
    console.log("selected answer #3: " + ansQ3);
    return ansQ3
  });
  $("#continue-btn").on("click", function (event) {
    // keep from sending off somewhere
    event.preventDefault();
    // comments can be added
    comment = $("#userComment").val().trim();
    // TEST
    console.log("user comments: " + comment);

    // store user selection and input
    // push to firebase database
    database.ref().push({
      currentDate: currentDate,
      mood: mood,
      ansQ1: ansQ1,
      ansQ2: ansQ2,
      ansQ3: ansQ3,
      comment: comment,
      timeAdded: firebase.database.ServerValue.TIMESTAMP
    });

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