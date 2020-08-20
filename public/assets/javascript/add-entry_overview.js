$(document).ready(function () {
  // get current date
  var currentDate = moment().format("MMM YYYY");
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
    // access database
    $("#answer-1").text(ansQ1);
    $("#answer-2").text(ansQ2);
    $("#answer-3").text(ansQ3);
    $("#display-comments-overview").text(comment);
  }

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