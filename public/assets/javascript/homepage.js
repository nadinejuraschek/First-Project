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
    getWeatherData("95624");
    function getWeatherData(search) {
        $.ajax({
        url: `http://dataservice.accuweather.com/locations/v1/postalcodes/search?q=${search}/&apikey=6GMzSjhmAKdFifcP3tfNWYih2JWvFHkN`,
        method: "GET"
        }).then(function (response) {
        console.log(response);
        let fahrenheit = Math.round((response.main.temp * 9) / 5 - 459.67);
        let temp = fahrenheit + '°F';
        $("#weather-icon").attr('src', 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png');
        $("#temp").text(temp);
        });
    };

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

    /****************************************
    AUTHENTICATION
    ****************************************/
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

});