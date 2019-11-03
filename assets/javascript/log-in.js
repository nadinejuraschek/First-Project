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

    /******************************
    VARIABLES
    ******************************/


    /******************************
    AUTHENTICATION
    ******************************/
    $("#submit-btn").on("click", function (event) {
        // keep button from sending form somewhere
        event.preventDefault();

        // store inputs
        var email = $("#email-input").val().trim();
        var password = $("#password-input").val().trim();

        // Firebase Sign In Function
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // display error message
            // $("#error-message").text("This user does not exist. Please sign up.");
        });
    });

    $("#signup-btn").on("click", function (event) {
        // keep button from sending form somewhere
        event.preventDefault();

        // store inputs
        var email = $("#email-input").val().trim();
        var password = $("#password-input").val().trim();
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    });

    firebase.auth().onAuthStateChanged(function (user) {
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

    $("#logout-btn").on("click", function (event) {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    });
    /******************************
    FORM VALIDATION
    ******************************/
    // Email
    var emailInput = $("#email-input");

    // validates input
    // function validateEmail() {
    //     var regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
    //   var validEmail = regEx.test(email);
    //   console.log(validEmail);
    //   if (!validEmail) {
    //     $("#email-error-message").css("display", "block");;
    //   }
    // }
    
    // Password
    var passwordInput = $("#password-input");
    var letter = $("#letter");
    var capital = $("#capital");
    var number = $("#number");
    var length = $("#length");
    // password message box displays when input field is clicked
    passwordInput.focus(function() {
    $("#password-error-message").css("display", "block");
    });
    // password message box is hidden when user clicks outside input field
    passwordInput.blur(function() {
    $("#password-error-message").css("display", "none");
    });
    // validates input
    passwordInput.keyup(function() {
        // validates lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if(passwordInput.val().match(lowerCaseLetters)) {
            letter.removeClass("invalid");
            letter.addClass("valid");
        } else {
            letter.removeClass("valid");
            letter.addClass("invalid");
        }
        // validates capital letters
        var upperCaseLetters = /[A-Z]/g;
        if(passwordInput.val().match(upperCaseLetters)) {
            capital.removeClass("invalid");
            capital.addClass("valid");
        } else {
            capital.removeClass("valid");
            capital.addClass("invalid");
        }
        // validates numbers
        var numbers = /[0-9]/g;
        if(passwordInput.val().match(numbers)) {
            number.removeClass("invalid");
            number.addClass("valid");
        } else {
            number.removeClass("valid");
            number.addClass("invalid");
        }
        // validates length
        if(passwordInput.val().length >= 8) {
            length.removeClass("invalid");
            length.addClass("valid");
        } else {
            length.removeClass("valid");
            length.addClass("invalid");
        }
    });
});