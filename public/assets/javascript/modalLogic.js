$(document).ready(function () {
/****************************
 MODAL DATA
****************************/
const questions = [
    {
      question: "Do you feel hopeless?",
      answer1: "Yes, all the time.",
      answer2: "Yes, sometimes.",
      answer3: "No."
    },
    {
      question: "Are you getting less sleep than usual?",
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
const currentDateDisplay = moment().format("MMMM Do, YYYY");
const currentDate = moment()._d;
const dayId = `${moment().format("YYYY")}-${moment().dayOfYear()}`;
// console.log(currentDate);
// console.log(dayId);
console.log("Today is: " + currentDateDisplay);
let mood = "";
// let moodVal = "";
let color = "";
let ansQ1 = "";
let Q1Val = "";
let ansQ2 = "";
let Q2Val = "";
let ansQ3 = "";
let Q3Val = "";
let comment = "";
$("#display-date").text(currentDateDisplay);

// select a mood
$(document).on("click", ".mood", function (event) {
    mood = $(this).attr("data-mood");
    // moodVal = $(this).attr("value");
    color = $(this).attr("data-color");
    $("#mood-states").find(".button-clicked").removeClass("button-clicked");
    $(this).addClass("button-clicked");
    // TEST
    console.log(`selected mood: ${mood}, ${color}.`);
  });
// select answer #1
$(document).on("click", ".answer-opt-1", function (event) {
    ansQ1 = $(this).attr("data-text");
    Q1Val = $(this).attr("value");
    $(".questionA-container").find(".answer-selected").removeClass("answer-selected");
    $(this).addClass("answer-selected");
    // TEST
    console.log(`selected answer #1: ${ansQ1}`);
});
// select answer #2
$(document).on("click", ".answer-opt-2", function (event) {
    ansQ2 = $(this).attr("data-text");
    Q2Val = $(this).attr("value");
    $(".questionB-container").find(".answer-selected").removeClass("answer-selected");
    $(this).addClass("answer-selected");
    // TEST
    console.log(`selected answer #2: ${ansQ2}`);
});
// select answer #3
$(document).on("click", ".answer-opt-3", function (event) {
    ansQ3 = $(this).attr("data-text");
    Q3Val = $(this).attr("value");
    $(".questionC-container").find(".answer-selected").removeClass("answer-selected");
    $(this).addClass("answer-selected");
    // TEST
    console.log(`selected answer #3: ${ansQ3}`);
});

// send form off and redirect user
$("#continue-btn").on("click", function (event) {
    // keep from sending off somewhere
    event.preventDefault();

    // comments can be added
    comment = $("#userComment").val().trim();

    // TEST
    // console.log("mood stored in database: " + mood);
    // console.log("color for mood: " + color);
    // console.log("answer #1 stored in database: " + ansQ1);
    // console.log("answer #1 stored in database: " + ansQ2);
    // console.log("answer #1 stored in database: " + ansQ3);
    // console.log("user comments: " + comment);

    // create entry in db
    let newLog = {
      date: currentDate,
      dayId: dayId,
      mood: mood,
      color: color,
      questionA: Q1Val,
      questionB: Q2Val,
      questionC: Q3Val,
      comment: comment
    };
    console.log(newLog);

    $.ajax({
      url: "/overview",
      method: "POST",
      data: newLog
    }).then(function () {
      // redirect user
      window.location.replace("overview.html");
    }).catch(function(err) {
      throw (err);
    });
  });
});