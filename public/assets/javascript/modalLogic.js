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
const currentDate = moment().format("MMMM Do, YYYY");
console.log("Today is: " + currentDate);
let mood = "";
let color = "";
let ansQ1 = "";
let ansQ2 = "";
let ansQ3 = "";
let comment = "";

// open "add entry" modal
/****************************
  ADD ENTRY MODAL
****************************/
// display modal
// $(document).on("click", "#add-entry-btn", function () {
//     $(".ui.modal").modal("show");
//     displayDate();
//     displayQuestions();
// });

function displayDate() {
    let currentDate = moment().format("MMMM Do, YYYY");
    console.log("Today is: " + currentDate);
    $("#display-date").text(currentDate);
};

// display modal content
// function displayQuestions() {
//     $("#questionA").text(questions[0].question);
//     $("#answer-1A").text(questions[0].answer1);
//     $("#answer-1A").attr("data-text", questions[0].answerText1);
//     $("#answer-2A").text(questions[0].answer2);
//     $("#answer-2A").attr("data-text", questions[0].answerText2);
//     $("#answer-3A").text(questions[0].answer3);
//     $("#answer-3A").attr("data-text", questions[0].answerText3);

//     $("#questionB").text(questions[1].question);
//     $("#answer-1B").text(questions[1].answer1);
//     $("#answer-1B").attr("data-text", questions[1].answerText1);
//     $("#answer-2B").text(questions[1].answer2);
//     $("#answer-2B").attr("data-text", questions[1].answerText2);
//     $("#answer-3B").text(questions[1].answer3);
//     $("#answer-3B").attr("data-text", questions[1].answerText3);

//     $("#questionC").text(questions[2].question);
//     $("#answer-1C").text(questions[2].answer1);
//     $("#answer-1C").attr("data-text", questions[2].answerText1);
//     $("#answer-2C").text(questions[2].answer2);
//     $("#answer-2C").attr("data-text", questions[2].answerText2);
//     $("#answer-3C").text(questions[2].answer3);
//     $("#answer-3C").attr("data-text", questions[2].answerText3);
// }

// submit button logic
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
    // return parseInt(ansQ1)
});
// select answer #2
$(document).on("click", ".answer-opt-2", function (event) {
    ansQ2 = $(this).attr("data-text");
    $(this).addClass("answer-selected");
    // TEST
    console.log("selected answer #2: " + ansQ2);
    // return parseInt(ansQ2)
});
// select answer #3
$(document).on("click", ".answer-opt-3", function (event) {
    ansQ3 = $(this).attr("data-text");
    $(this).addClass("answer-selected");
    // TEST
    console.log("selected answer #3: " + ansQ3);
    // return parseInt(ansQ3)
});
// // add comments
// $(document).on("click", "#add-comment", function (event) {
//     let comment = $("#userComment").val().trim();
//     // TEST
//     console.log("added comment: " + comment);
//     return comment
// });

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
      date: "2020-03-05",
      mood: 1,
      questionA: 2,
      questionB: 1,
      questionC: 1,
      comment: comment
    };
    console.log(newLog);
      
    $.ajax({
      url: "/overview",
      method: "POST",
      data: newLog
    }).then(function () {
      res.redirect('/overview');
    });
  // });

  // Log.create(newLog, function(err, addLog) {
  //     if(err) {
  //       console.log('Error: ' + err);
  //     } else {
  //       // redirect to overview
  //       res.redirect('/overview');
  //     };
  //   });
  //   return newLog;
  });
});