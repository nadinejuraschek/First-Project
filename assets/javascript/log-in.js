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
    const database = firebase.database();
    const auth = firebase.auth();

    /******************************
    AUTHENTICATION
    ******************************/
    $("#login-btn").on("click", e => {
        // keep button from sending form somewhere
        e.preventDefault();
        console.log("login clicked");

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
        console.log("signup clicked");

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
            window.location.replace("log-in.html");
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
});