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

    /******************************
    SEMANTIC FORM - VALIDATION?
    ******************************/
    // $('.ui.form').form({
    //     fields: {
    //         email: {
    //           identifier  : 'email',
    //           rules: [{
    //               type   : 'empty',
    //               prompt : 'Please enter your e-mail'
    //             },
    //             {
    //               type   : 'email',
    //               prompt : 'Please enter a valid e-mail'
    //             }]
    //         },
    //         password: {
    //           identifier  : 'password',
    //           rules: [{
    //               type   : 'empty',
    //               prompt : 'Please enter your password'
    //             },
    //             {
    //               type   : 'length[6]',
    //               prompt : 'Your password must be at least 6 characters'
    //             }]
    //         }
    //     }
    // });
});