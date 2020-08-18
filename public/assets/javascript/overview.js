$(document).ready(function () {
    function createGraph() {
        for (let i = 0; i < 52; i++) {
            let year = new Date().getFullYear();
            let id = `${year}-${i}`;
            let day = `<li class='graph-day' id=${id}></li>`;
            $('.graph').append(day);
        }
    }

    createGraph();
});