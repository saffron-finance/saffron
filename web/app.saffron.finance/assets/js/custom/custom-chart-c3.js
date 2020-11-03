/*
---------------------------------
    : Custom - C3 Charts js :
---------------------------------
*/
"use strict";
$(document).ready(function() {
    /* -- C3 - Scatter Plot Chart -- */
    var scatterPlotChart = c3.generate({
        bindto: '#c3-scatter-plot',
        color: { pattern: ["#f4f5f7", "#9ccc34", "#0442ba"] },
        data: {
            xs: {
                setosa: 'setosa_x',
                versicolor: 'versicolor_x',
            },
            columns: [
                ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
                ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
                ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
            ],
            type: 'scatter'
        },
        axis: {
            x: {
                label: 'Sepal.Width',
                tick: {
                    fit: false
                }
            },
            y: {
                label: 'Petal.Width'
            }
        }
    });
    setTimeout(function () {
        scatterPlotChart.load({
            xs: {
                virginica: 'virginica_x'
            },
            columns: [
                ["virginica_x", 3.3, 2.7, 3.0, 2.9, 3.0, 3.0, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3.0, 2.5, 2.8, 3.2, 3.0, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3.0, 2.8, 3.0, 2.8, 3.8, 2.8, 2.8, 2.6, 3.0, 3.4, 3.1, 3.0, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3.0, 2.5, 3.0, 3.4, 3.0],
                ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
            ]
        });
    }, 1000);
    setTimeout(function () {
        scatterPlotChart.unload({
            ids: 'setosa'
        });
    }, 2000);
    setTimeout(function () {
        scatterPlotChart.load({
            columns: [
                ["virginica", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
            ]
        });
    }, 3000);
    /* -- C3 - Step Chart -- */
    var stepcChart = c3.generate({
        bindto: '#c3-step',
        color: { pattern: ["#0442ba", "#9ccc34"] },
        data: {
            columns: [
                ['SeriesA', 300, 350, 300, 0, 0, 100],
                ['SeriesB', 130, 100, 140, 200, 150, 50]
            ],
            types: {
                SeriesA: 'step',
                SeriesB: 'area-step'
            }
        }
    });
    /* -- C3 - Simple Line Chart -- */
    var simpleLineChart = c3.generate({
        bindto: '#c3-simple-line',
        color: { pattern: ["#0442ba", "#9ccc34"] },
        data: {
            columns: [
                ['SeriesA', 30, 200, 100, 400, 150, 250],
                ['SeriesB', 130, 340, 200, 500, 250, 350]
            ]
        }
    });
    /* -- C3 - Spline Chart -- */
    var splineChart = c3.generate({
        bindto: '#c3-spline',
        color: { pattern: ["#0442ba", "#9ccc34"] },
        data: {
            columns: [
                ['SeriesA', 30, 200, 100, 400, 150, 250],
                ['SeriesB', 130, 100, 140, 200, 150, 50]
            ],
            type: 'spline'
        }
    });
    /* -- C3 - Area Chart -- */
    var areaChart = c3.generate({
        bindto: '#c3-area',
        color: { pattern: ["#0442ba", "#9ccc34"] },
        data: {
            columns: [
                ['SeriesA', 100, 75, 50, 75, 50, 75, 100],
                ['SeriesB', 70, 45, 20, 45, 20, 45, 70]
            ],
            types: {
                SeriesA: 'area',
                SeriesB: 'area-spline'
            }
        }
    });
    /* -- C3 - Stacked Area Chart -- */
    var stackedChart = c3.generate({
        bindto: '#c3-stacked-area',
        color: { pattern: ["#0442ba", "#9ccc34"] },
        data: {
            columns: [
                ['SeriesA', 100, 75, 50, 75, 50, 75, 100],
                ['SeriesB', 90, 65, 40, 65, 40, 65, 90]
            ],
            types: {
                SeriesA: 'area-spline',
                SeriesB: 'area-spline'
            },
            groups: [['SeriesA', 'SeriesB']]
        }
    });
    /* -- C3 - Bar Chart -- */
    var barChart = c3.generate({
        bindto: '#c3-bar',
        color: { pattern: ["#0442ba", "#9ccc34"] },
        data: {
            columns: [
                ['SeriesA', 30, 200, 100, 400, 150, 250],
                ['SeriesB', 130, 100, 140, 200, 150, 50]
            ],
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5
            }
        }
    });
    /* -- C3 - Stacked Bar Chart -- */
    var stackedBarChart = c3.generate({
        bindto: '#c3-stacked-bar',
        color: { pattern: ["#f4f5f7", "#0442ba", "#9ccc34"] },
        data: {
            columns: [
                ['SeriesA', 30, 200, 200, 400, 150, 250],
                ['SeriesB', 130, 100, 100, 200, 150, 50],
                ['SeriesC', 230, 200, 200, 300, 250, 250]
            ],
            type: 'bar',
            groups: [
                ['SeriesA', 'SeriesB']
            ]
        },
        grid: {
            y: {
                lines: [{value:0}]
            }
        }
    });
    /* -- C3 - Combination Chart -- */
    var combinationChart = c3.generate({
        bindto: '#c3-combination',
        color: { pattern: ["#0442ba", "#f4f5f7", "#f62525", "#25bef6", "#9ccc34", "#fcbc04"] },
        data: {
            columns: [
                ['SeriesA', 30, 20, 50, 40, 60, 50],
                ['SeriesB', 200, 130, 90, 240, 130, 220],
                ['SeriesC', 300, 200, 160, 400, 250, 250],
                ['SeriesD', 200, 130, 90, 240, 130, 220],
                ['SeriesE', 130, 120, 150, 140, 160, 150],
                ['SeriesF', 90, 70, 20, 50, 60, 120],
            ],
            type: 'bar',
            types: {
                SeriesC: 'spline',
                SeriesD: 'line',
                SeriesF: 'area',
            },
            groups: [
                ['SeriesA','SeriesB']
            ]
        }
    });
    /* -- C3 - Gauge Chart -- */
    var gaugeChart = c3.generate({
        bindto: '#c3-gauge',            
        data: {
            columns: [
                ['SeriesA', 91.4]
            ],
            type: 'gauge',
            onclick: function (d, i) {  },
            onmouseover: function (d, i) {  },
            onmouseout: function (d, i) {  }
        },
        gauge: {
            width: 40,
        },
        color: {
            pattern: ['#9ccc34', '#f62525', '#fcbc04', '#0442ba'],
            threshold: {
                values: [30, 60, 90, 100]
            }
        },
        size: {
            height: 320
        }
    });
    setTimeout(function () {
        gaugeChart.load({
            columns: [['SeriesA', 10]]
        });
    }, 1000);
    setTimeout(function () {
        gaugeChart.load({
            columns: [['SeriesA', 50]]
        });
    }, 2000);
    setTimeout(function () {
        gaugeChart.load({
            columns: [['SeriesA', 70]]
        });
    }, 3000);
    setTimeout(function () {
        gaugeChart.load({
            columns: [['SeriesA', 0]]
        });
    }, 4000);
    setTimeout(function () {
        gaugeChart.load({
            columns: [['SeriesA', 100]]
        });
    }, 5000);
    /* -- C3 - Pie Chart -- */
    var pieChart = c3.generate({
        bindto: '#c3-pie',
        color: { pattern: ["#0442ba", "#f4f5f7", "#9ccc34"] },
        data: {
            columns: [
                ['SeriesA', 40],
                ['SeriesB', 25],
                ['SeriesC', 35],
            ],
            type : 'pie',
            onclick: function (d, i) {  },
            onmouseover: function (d, i) {  },
            onmouseout: function (d, i) {  }
        }
    });
    /* -- C3 - Donut Chart -- */
    var donutChart = c3.generate({
        bindto: '#c3-donut',
        color: { pattern: ["#0442ba", "#f4f5f7", "#9ccc34"] },
        data: {
            columns: [
                ['SeriesA', 40],
                ['SeriesB', 25],
                ['SeriesC', 35],
            ],
            type : 'donut',
            onclick: function (d, i) {  },
            onmouseover: function (d, i) {  },
            onmouseout: function (d, i) {  }
        },
        donut: {
            title: "Iris Petal Width",
            width: 40,
            label: {
                show: 0
            }
        }
    });        
});