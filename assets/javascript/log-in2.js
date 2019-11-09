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
    /******************************
    AUTHENTICATION
    ******************************/
    $("#login-btn").on("click", function (event) {
        event.preventDefault();
    });
});