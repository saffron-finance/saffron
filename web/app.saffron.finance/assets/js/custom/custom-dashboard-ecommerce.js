/*
-------------------------------------------
    : Custom - Dashboard Ecommerce js :
-------------------------------------------
*/
"use strict";
$(document).ready(function() {
    /* -- Piety - Bar Chart 1 -- */
    $(".piety-bar-1").peity("bar", {
      width: 55,
      height: 55,   
      padding: 0.2,  
      fill: ["#0442ba"],
    });

    /* -- Piety - Bar Chart 2 -- */
    $(".piety-bar-2").peity("bar", {
      width: 55,
      height: 55,   
      padding: 0.2,  
      fill: ["#acacb4"]
    });

    /* -- Piety - Bar Chart 3 -- */
    $(".piety-bar-3").peity("bar", {
      width: 55,
      height: 55,   
      padding: 0.2,  
      fill: ["#9ccc34"]
    });

    /* -- Piety - Bar Chart 4  -- */
    $(".piety-bar-4").peity("bar", {
      width: 55,
      height: 55,   
      padding: 0.2,  
      fill: ["#fcbc04"]
    });

    /* -- Piety - Bar Chart 5 -- */
    $(".piety-bar-5").peity("bar", {
      width: 55,
      height: 55,   
      padding: 0.2,  
      fill: ["#25bef6"]
    });

    /* -- Piety - Bar Chart 6  -- */
    $(".piety-bar-6").peity("bar", {
      width: 55,
      height: 55,   
      padding: 0.2,  
      fill: ["#f62525"]
    });

    /* -- Apex - Mixed Line Chart  -- */
    var options = {
        chart: {
           height: 270,
           type: 'line',
           toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#0442ba','#9ccc34','#fcbc04'],
        series: [{
            name: "Session Duration",
            data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
            name: "Page Views",
            data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
            name: 'Total Visits',
            data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
        ],        
        dataLabels: {
            enabled: false
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5]
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], opacity: .2
            },
            borderColor: 'rgba(0,0,0,0.05)'
        },
        xaxis: {
          categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
            '10 Jan', '11 Jan', '12 Jan'
          ],
        },
        legend: {
          tooltipHoverFormatter: function(val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)"
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session"
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                }
              }
            }
          ]
        },
    };
    var chart = new ApexCharts(document.querySelector("#apex-mixed-line-chart"), options);
    chart.render();

    /* -- Apex Column Bar Chart -- */
    var options = {
      series: [{
      name: 'Servings',
      data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65]
    }],
      annotations: {
      points: [{
        x: 'Bananas',
        seriesIndex: 0,
        label: {
          borderColor: '#0442ba',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#0442ba',
          },
          text: 'Bananas are good',
        }
      }]
    },
    chart: {
      height: 300,
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '25%',
        endingShape: 'rounded'  
      }
    },
    colors: ['#0442ba'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2
    },    
    grid: {
      row: {
        colors: ['#fff', '#fff']
      }
    },
    xaxis: {
      labels: {
        rotate: -45
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      tickPlacement: 'on'
    },
    yaxis: {
      title: {
        text: 'Servings',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100]
      },
    }
    };
    var chart = new ApexCharts(document.querySelector("#apex-column-chart"), options);
    chart.render();

    /* -- Apex Donut Chart -- */
    var options = {        
        chart: {
          type: 'donut',
          width: 300,
        },
        colors: ['#0442ba', '#9ccc34','#acacb4'], 
        series: [45, 35, 20],
        labels: ['Website', 'Mobile', 'TV Portal'],
        legend: {
            position: 'bottom'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 250
            }
          }
        }]
    };
    var chart = new ApexCharts(document.querySelector("#apex-donut-chart"), options);
    chart.render();
});