var test;

setInterval(function () {
    $.ajax({
        url: 'http://34.84.89.13:3000/graph',
        method: 'GET',
        dataType: 'json',
        success: (data) => {

            test = data[0].Wave;
        }
    });
}, 1000);



var sensor = new TimeSeries();
setInterval(function () {
    sensor.append(new Date().getTime(), test);
}, 500);


function createTimeline() {
    var chart = new SmoothieChart();
    chart.addTimeSeries(sensor, {
        strokeStyle: 'rgba(0, 255, 0, 1)',
        fillStyle: 'rgba(0, 255, 0, 0.2)',
        lineWidth: 4
    });
    chart.streamTo(document.getElementById("chart"), 500);
}
