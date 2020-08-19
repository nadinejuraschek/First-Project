$(document).ready(function () {
    function createGraph() {
        for (let i = 1; i < 365; i++) {
            let year = new Date().getFullYear();
            let id = `${year}-${i}`;
            let day = `<div class='graph-day' id=${id}></div>`;
            $('.graph').append(day);
        }
    }

    createGraph();
});