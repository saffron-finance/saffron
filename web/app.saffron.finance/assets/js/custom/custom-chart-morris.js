/*
-------------------------------------
    : Custom - Morris Charts js :
-------------------------------------
*/
"use strict";
$(document).ready(function() {
    /* -- Morris - Line Chart -- */
    var morrisLineData = [
      {"y": "2012", "a": 3407, "b": 660},
      {"y": "2011", "a": 3351, "b": 629},
      {"y": "2010", "a": 3269, "b": 618},
      {"y": "2009", "a": 3246, "b": 661},
      {"y": "2008", "a": 3257, "b": 667},
      {"y": "2007", "a": 3248, "b": 627},
      {"y": "2006", "a": 3171, "b": 660},
      {"y": "2005", "a": 3171, "b": 676},
      {"y": "2004", "a": 3201, "b": 656},
      {"y": "2003", "a": 3215, "b": 622}
    ];
    Morris.Line({
        element: 'morris-line',
        data: morrisLineData,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        lineColors: ['#0442ba', '#9ccc34'],
        pointStrokeColors: ['#ffffff', '#ffffff'],
        gridLineColor: 'rgba(0,0,0,0.1)',
        gridTextColor: "#4e5d71",
        hideHover: 'auto',
        resize: true,
    });    
    /* -- Morris - Updating Chart -- */
    var nReloads = 0;
    function data(offset) {
      var ret = [];
      for (var x = 0; x <= 360; x += 10) {
        var v = (offset + x) % 360;
        ret.push({
          x: x,
          y: Math.sin(Math.PI * v / 180).toFixed(4),
          z: Math.cos(Math.PI * v / 180).toFixed(4)
        });
      }
      return ret;
    }
    var morrisUpdating = Morris.Line({
        element: 'morris-updating',
        data: data(0),
        xkey: 'x',
        ykeys: ['y', 'z'],
        labels: ['Series A', 'Series B'],
        parseTime: false,
        ymin: -1.0,
        ymax: 1.0,
        hideHover: true,
        lineColors: ['#0442ba', '#9ccc34'],
        pointStrokeColors: ['#ffffff', '#ffffff'],
        gridLineColor: 'rgba(0,0,0,0.1)',
        gridTextColor: "#4e5d71",
        resize: true
    });
    function update() {
      nReloads++;
      morrisUpdating.setData(data(5 * nReloads));
      $('#reloadStatus').text(nReloads + ' reloads');
    }
    setInterval(update, 100);
    /* -- Morris - Bar Chart -- */
    Morris.Bar({
        element: 'morris-bar',
        data: [
            {y: '2011 Q1', a: 30, b: 20, c: 10},
            {y: '2011 Q2', a: 10, b: 20, c: 10},
            {y: '2011 Q3', a: 40, b: 30, c: 20},
            {y: '2011 Q4', a: 20, b: 30, c: 40},
            {y: '2011 Q5', a: 10, b: 20, c: 10},
            {y: '2011 Q6', a: 10, b: 20, c: 30}
        ],
        xkey: 'y',
        ykeys: ['a', 'b', 'c'],
        labels: ['Series A', 'Series B','Series C'],
        barColors: ['#0442ba', '#9ccc34','#e9eff9'],
        gridLineColor: 'rgba(0,0,0,0.1)',
        gridTextColor: "#4e5d71",
        hideHover: 'auto',
        resize: true
    });
    /* -- Morris - Stacked Bar Chart -- */
    Morris.Bar({
        element: 'morris-stacked-bar',
        data: [
            {y: '2011 Q1', a: 6, b: 4, c: 2},
            {y: '2011 Q2', a: 8, b: 6, c: 4},
            {y: '2011 Q3', a: 4, b: 8, c: 4},
            {y: '2011 Q4', a: 10, b: 4, c: 6},
            {y: '2011 Q5', a: 2, b: 8, c: 4},
            {y: '2011 Q6', a: 10, b: 2, c: 8}
        ],
        xkey: 'y',
        ykeys: ['a', 'b', 'c'],
        labels: ['Series A', 'Series B','Series C'],
        stacked: true,
        barColors: ['#0442ba', '#9ccc34','#e9eff9'],
        gridLineColor: 'rgba(0,0,0,0.1)',
        gridTextColor: "#4e5d71",
        hideHover: 'auto',
        resize: true
    });    
    /* -- Morris - Area Chart -- */
    Morris.Area({
        element: 'morris-area',
        data: [
            { y: '2006', a: 100, b: 90 },
            { y: '2007', a: 75,  b: 65 },
            { y: '2008', a: 50,  b: 40 },
            { y: '2009', a: 75,  b: 65 },
            { y: '2010', a: 50,  b: 40 },
            { y: '2011', a: 75,  b: 65 },
            { y: '2012', a: 100, b: 90 }
        ],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        lineColors: ['#0442ba', '#9ccc34'],
        pointStrokeColors: ['#ffffff', '#ffffff'],
        fillOpacity: 0.8,
        gridLineColor: 'rgba(0,0,0,0.1)',
        gridTextColor: "#4e5d71",
        hideHover: 'auto',
        resize: true,
    });
    /* -- Morris - Area Chart without Point & Line -- */
    Morris.Area({
        element: 'morris-area-without-line-point',
        data: [
            { y: '2006', a: 0, b: 0 },
            { y: '2007', a: 100,  b: 55 },
            { y: '2008', a: 55,  b: 110 },
            { y: '2009', a: 120,  b: 30 },
            { y: '2010', a: 80,  b: 140 },
            { y: '2011', a: 0, b: 0 }
        ],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        lineColors: ['#9ccc34', '#0442ba'],
        pointStrokeColors: ['#ffffff', '#ffffff'],
        fillOpacity: 0.8,
        pointSize: 0,
        lineWidth: 0,
        behaveLikeLine: true,
        gridLineColor: 'rgba(0,0,0,0.1)',
        gridTextColor: "#4e5d71",
        hideHover: 'auto',
        resize: true,
    });
    /* -- Morris - Area Chart without Smooth -- */
    Morris.Area({
        element: 'morris-area-without-smooth',
        data: [
            { y: '2006', a: 0, b: 0 },
            { y: '2007', a: 130,  b: 100 },
            { y: '2008', a: 80,  b: 60 },
            { y: '2009', a: 70,  b: 200 },
            { y: '2010', a: 180,  b: 150 },
            { y: '2011', a: 105,  b: 90 },
            { y: '2012', a: 250,  b: 150 }
        ],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        lineColors: ['#9ccc34', '#0442ba'],
        pointStrokeColors: ['#ffffff', '#ffffff'],
        fillOpacity: 0.8,
        pointSize: 0,
        lineWidth: 0,
        behaveLikeLine: true,
        smooth: false,
        gridLineColor: 'rgba(0,0,0,0.1)',
        gridTextColor: "#4e5d71",
        hideHover: 'auto',
        resize: true,
    });
    /* -- Morris - Donut Chart -- */
    Morris.Donut({
      element: 'morris-donut',
      data: [
        {value: 70, label: 'Foo'},
        {value: 15, label: 'Bar'},
        {value: 10, label: 'Baz'}
      ],
      colors: ['#0442ba', '#9ccc34','#e9eff9'],
      resize: true,
      labelColor: "#4e5d71",
      backgroundColor: "transparent",
      formatter: function (x) { return x + "%"}
    });
});