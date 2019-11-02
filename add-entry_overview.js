$(document).ready(function () {
  /****************************
  VARIABLES
  ****************************/
  var answer1 = "";
  var answer2 = "";
  var answer3 = "";
  var comment = "";

  var currentDate = moment().format("MMMM Do, YYYY");
  console.log("Today is: " + currentDate);

  /****************************
  FUNCTIONS
  ****************************/
  function displayDailySummary() {

  }

  function displayDate() {
    $("#display-date").text(currentDate);
  }

  /****************************
  EVENTS
  ****************************/

  /****************************
  MAIN CODE
  ****************************/
  // displayDailySummary();
  displayDate()


});