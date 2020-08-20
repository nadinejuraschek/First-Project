$(document).ready(function () {
    $.ajax({
        url: "/api/user/:id/entries",
        method: "GET",
        async: true,
        dataType: "json",
    }).done(function(data) {
        data.map(day => {
            console.log(day.fieldId);
            $(`.${day.fieldId}`).css({backgroundColor: `#${day.color}`});
        });
    });

    // display current month and year in header
    let currentDate = moment().format("MMMM YYYY");
    let year = new Date().getFullYear();
    $(".display-date").html(currentDate);

    // change month to diplay logs
    $("#prev-month").on("click", function() {
        prevMonth();
    });

    $("#next-month").on("click", function() {
        nextMonth();
    });

    function prevMonth() {
        currentDate = moment(currentDate).subtract(1, "month").format("MMMM YYYY");
        $(".display-date").html(currentDate);
    };

    function nextMonth() {
        currentDate = moment(currentDate).add(1, "month").format("MMMM YYYY");
        $(".display-date").html(currentDate);
    };

    // create mood graph
    createGraph();

    function createGraph() {
        // create one square for each day of the year
        for (let i = 1; i < 365; i++) {
            // give each div a unique className to target later on for color change
            // let year = new Date().getFullYear();
            let className = `${year}-${i}`;
            let day = `<div class='graph-day ${className}'></div>`;
            $('.graph').append(day);
        };

        let widthOfSquare = $('.graph-day').width();
        $('.graph-day').css({'height': `${widthOfSquare}px`});
    };
});
