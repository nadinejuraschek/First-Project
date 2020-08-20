$(document).ready(function () {
    /******************************
    NAVIGATION
    ******************************/
    $(document).on("click", "#menu-btn", function() {
        $("#menu-dropdown").toggle("fade-in");
    });

    /******************************
    FOOTER
    ******************************/
    $('.year').html(new Date().getFullYear());

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

    $(document).on('click', '#test-btn', function(event) {
        event.preventDefault();

        // set values to test user account values
        let testUser = {
            username: 'tester',
            password: 'abc123'
        };
        console.log(testUser);

        // make POST request to database
        $.ajax({
            url: "/login",
            method: "POST",
            data: testUser
        }).then(function () {
            // redirect to /home
            window.location.href = ('/home');
        }).catch(function(err) {
            throw (err);
        });
    })

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
    function getWeather(search) {
        $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=90a3db80fa91ca69d88cc81fff6bce71`,
        method: "GET"
        }).then(function (response) {
        let iconSrc = 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png';
        let temp = Math.round((response.main.temp * 9) / 5 - 459.67);
        console.log(iconSrc);
        console.log(temp);
        $('#weather-icon').attr('src', iconSrc);
        $('#temp').text(temp + '°F');
        });
    };
    getWeather("Sacramento,US");

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
    // var appendNumber = 4;
    // var prependNumber = 1;
    // var swiper = new Swiper('.swiper-container', {
    //     slidesPerView: 3,
    //     centeredSlides: true,
    //     spaceBetween: 30,
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },
    // });
    // $(".prepend-2-slides").on('click', function (e) {
    //     e.preventDefault();
    //     swiper.prependSlide([
    //         '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>',
    //         '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>'
    //     ]);
    // });
    // $(".prepend-slide").on('click', function (e) {
    //     e.preventDefault();
    //     swiper.prependSlide('<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>');
    // });
    // $(".append-slide").on('click', function (e) {
    //     e.preventDefault();
    //     swiper.appendSlide('<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>');
    // });
    // $(".append-2-slides").on('click', function (e) {
    //     e.preventDefault();
    //     swiper.appendSlide([
    //         '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>',
    //         '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>'
    //     ]);
    // });
});