$(document).ready(function () {
    /******************************
    FIREBASE
    ******************************/
    // Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBnU7Zq6CmOii6hEHnrzFbrJqKKJ2i_t9U",
        authDomain: "mental-health-tracker-f579d.firebaseapp.com",
        databaseURL: "https://mental-health-tracker-f579d.firebaseio.com",
        projectId: "mental-health-tracker-f579d",
        storageBucket: "mental-health-tracker-f579d.appspot.com",
        messagingSenderId: "390219052736",
        appId: "1:390219052736:web:24d86ce5417805b74a5f25"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const auth = firebase.auth();
    // Firebase watcher + initial loader
    database.ref().on("child_added", function (childSnapshot) {
        // add new table row
        var tr = $("<tr>");
        tr.append($("<td>" + childSnapshot.val().currentDate + "</td>"));
        console.log(childSnapshot.val().currentDate);
        tr.append($("<td style='background-color:" + childSnapshot.val().color + "'>" + childSnapshot.val().mood + "</td>"));
        console.log(childSnapshot.val().mood);
        tr.append($("<td class='answers'>" + childSnapshot.val().ansQ1 + "<br>" + childSnapshot.val().ansQ2 + "<br>" + childSnapshot.val().ansQ3 + "<br>" + "</td>"));
        console.log(childSnapshot.val().ansQ1 + ", " + childSnapshot.val().ansQ2 + ", " + childSnapshot.val().ansQ3);
        tr.append($("<td style='comment'>" + childSnapshot.val().comment + "</td>"));
        console.log(childSnapshot.val().comment);
        $("#tracker-table").append(tr);
        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    /******************************
    AUTHENTICATION
    ******************************/
    $("#login-btn").on("submit", e => {
        // keep button from sending form somewhere
        e.preventDefault();

        // store inputs
        var email = $("#email-input").val().trim();
        var password = $("#password-input").val().trim();

        // Firebase Sign In Function
        var promise = auth.signInWithEmailAndPassword(email, password)
        promise.then(function (e) {
            window.location.replace("homepage.html");
        })
            .catch(function (e) {
                // Handle Errors here.
                var errorCode = e.code;
                var errorMessage = e.message;
                // display error message
                alert("This user does not exist. Please sign up.");
            });
    });

    $("#signup-btn").on("click", e => {
        // console.log("clicked");
        // keep button from sending form somewhere
        e.preventDefault();

        // store inputs
        var email = $("#email-input").val().trim();
        console.log(email);
        var password = $("#password-input").val().trim();
        console.log(password);
        var promise = auth.createUserWithEmailAndPassword(email, password);
        promise.then(function (e) {
            window.location.replace("homepage.html");
        })
            .catch(function (e) {
                // Handle Errors here.
                var errorCode = e.code;
                var errorMessage = e.message;
                alert(errorCode + ": " + errorMessage);
            });
    });

    auth.onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log(user);
            // ...
        } else {
            // User is signed out.
            // ...
        }
    });

    $("#logout-btn").on("click", e => {
        auth.signOut().then(function (e) {
            // Sign-out successful.
            window.location.replace("index.html");
        }).catch(function (e) {
            // An error happened.
            var errorMessage = e.message;
            alert(errorCode + ": " + errorMessage);
        });
    });

    /******************************
    FORM VALIDATION
    ******************************/
    // Password
    var passwordInput = $("#password-input");
    var capital = $("#capital");
    var number = $("#number");
    var length = $("#length");
    // password message box displays when input field is clicked
    passwordInput.focus(function () {
        $("#password-error-message").css("display", "block");
    });
    // password message box is hidden when user clicks outside input field
    passwordInput.blur(function () {
        $("#password-error-message").css("display", "none");
    });
    // validates input
    passwordInput.keyup(function () {
        // validates capital letters
        var upperCaseLetters = /[A-Z]/g;
        if (passwordInput.val().match(upperCaseLetters)) {
            capital.removeClass("invalid");
            capital.addClass("valid");
        } else {
            capital.removeClass("valid");
            capital.addClass("invalid");
        }
        // validates numbers
        var numbers = /[0-9]/g;
        if (passwordInput.val().match(numbers)) {
            number.removeClass("invalid");
            number.addClass("valid");
        } else {
            number.removeClass("valid");
            number.addClass("invalid");
        }
        // validates length
        if (passwordInput.val().length >= 8) {
            length.removeClass("invalid");
            length.addClass("valid");
        } else {
            length.removeClass("valid");
            length.addClass("invalid");
        }
    });

    /****************************
    ADD ENTRY / OVERVIEW
    ****************************/
    // questions and answers
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
    // variables to store user input
    var mood = "";
    var color = "";
    var ansQ1 = "";
    var ansQ2 = "";
    var ansQ3 = "";
    var comment = "";
    // display date
    function displayDate() {
        $("#display-date").text(currentDate);
        $("#display-date-weather").text(currentDate);
    }
    // display questions to ask user and answer options
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
    });
    // display current date
    displayDate();
    // display questions
    displayQuestions();
    // select a mood and store color for table
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

    /****************************************
    HOMEPAGE
    ****************************************/
    // fix menu when passed
    $('.masthead').visibility({
        once: false,
        onBottomPassed: function () {
            $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function () {
            $('.fixed.menu').transition('fade out');
        }
    });
    // create sidebar and attach to menu open
    $('.ui.sidebar').sidebar('attach events', '.toc.item');

    /****************************************
    APIs
    ****************************************/
    // Weather
    var APIKeyWeather = "90a3db80fa91ca69d88cc81fff6bce71"
    var queryURLWeather =
        "https://api.openweathermap.org/data/2.5/weather?q=Sacramento,US&appid=" +
        APIKeyWeather;
    function getWeather() {
        $.ajax({
            url: queryURLWeather,
            method: "GET"
        }).then(function (response) {
            console.log(queryURLWeather);
            console.log(response);
            var iconWeather = $("<img class='weather-icon' src='https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png' alt='weather Sacramento, US'>");
            console.log(response.weather[0].icon);
            var fahrenheit = Math.round((response.main.temp * 9) / 5 - 459.67);
            var temp = $("<p class='temp'>" + fahrenheit + "°F</p>");
            console.log(fahrenheit);
            displayDate();
            $("#weather").append(iconWeather);
            $("#weather").append(temp);
        });
    }
    getWeather();

    // Inspirational Quote
    function getNewQuote() {
        $.ajax({
            url: "https://api.forismatic.com/api/1.0/",
            jsonp: "jsonp",
            dataType: "jsonp",
            data: {
                method: "getQuote",
                lang: "en",
                format: "jsonp"
            },
            success: function (response) {
                quote = response.quoteText;
                author = response.quoteAuthor;
                $("#quote").text(quote);
                console.log(quote);
                console.log(author);
                if (author) {
                    $("#author").text("By " + author);
                } else {

                    $("#author").text(" ~ Unknown");
                }
            }
        });
    }
    getNewQuote();

    /*****************************
    DISCOVER
    *****************************/
    // Slideshow with swiper.js
    var appendNumber = 4;
    var prependNumber = 1;
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    $(".prepend-2-slides").on('click', function (e) {
        e.preventDefault();
        swiper.prependSlide([
            '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>',
            '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>'
        ]);
    });
    $(".prepend-slide").on('click', function (e) {
        e.preventDefault();
        swiper.prependSlide('<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>');
    });
    $(".append-slide").on('click', function (e) {
        e.preventDefault();
        swiper.appendSlide('<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>');
    });
    $(".append-2-slides").on('click', function (e) {
        e.preventDefault();
        swiper.appendSlide([
            '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>',
            '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>'
        ]);
    });
});