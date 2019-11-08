$(document).ready(function () {
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
    // function getWeather() {

    // }

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
    /****************************************
    MAIN CODE
    ****************************************/
    getNewQuote();

});