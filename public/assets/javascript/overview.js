$(document).ready(function () {
    // display current month and year in header
    let currentDate = moment();
    let entries = [];
    let displayEntries = [];
    let year = moment().format("YYYY");
    let month = moment().format("MMM");
    $(".display-date").html(moment().format("MMMM YYYY"));

    $.ajax({
        url: "/api/user/:id/entries",
        method: "GET",
        async: false,
        dataType: "json",
        success: function (data) {
            entries = data;
        }
    });

    // create mood graph
    createGraph();
    entries.map(entry => {
        $(`.${entry.dayId}`).css({ backgroundColor: `${entry.color}` });
        if (moment(entry.date).format("YYYY") === year) {
            if (moment(entry.date).format("MMM") === month) {
                    displayEntries.push(entry);
            };
        };
    });
    displayEntries.map(day => {
        let row = `<tr><td class="tracker-table-date" style="background-color: ${day.color}">${moment(day.date).format("DD")}</td><td class="tracker-table-comments">${day.comment}</td></tr>`;
        $(".tracker-table-body").append(row);
    });

    // change month to diplay logs
    $("#prev-month").on("click", function() {
        prevMonth();
        getDisplayEntries(currentDate);
    });

    $("#next-month").on("click", function() {
        nextMonth();
        getDisplayEntries(currentDate);
    });

    function prevMonth() {
        currentDate = moment(currentDate).subtract(1, "month").format("MMMM YYYY");
        $(".display-date").html(currentDate);
    };

    function nextMonth() {
        currentDate = moment(currentDate).add(1, "month").format("MMMM YYYY");
        $(".display-date").html(currentDate);
    };

    function getDisplayEntries(day) {
        $(".tracker-table-body").empty();
        displayEntries = [];
        entries.map(entry => {
            if (moment(entry.date).format("YYYY") === moment(day).format("YYYY")) {
                if (moment(entry.date).format("MMM") === moment(day).format("MMM")) {
                    displayEntries.push(entry);
                };
            };
        });
        displayEntries.map(day => {
            let row = `<tr><td class="tracker-table-date" style="background-color: ${day.color}">${moment(day.date).format("DD")}</td><td class="tracker-table-comments">${day.comment}</td></tr>`;
            $(".tracker-table-body").append(row);
        });
    };

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
