/*
---------------------------------
    : Custom - Widgets js :
---------------------------------
*/
"use strict";
$(document).ready(function() {   
    /* -----  Apex Line1 Chart ----- */
    var options = {
        chart: {
            height: 150,
            type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#0442ba'],
        series: [{
            data: [50, 60, 40, 60, 67, 61, 62, 82, 103, 84, 54, 65]
        }],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 4
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], opacity: .2
            },
            borderColor: 'transparent'
        },
        yaxis: {
            labels: {
                show: false
            },
            min: 0
        },
        xaxis: {
            labels: {
                show: false
            },
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: {
                show: false, 
                color: 'transparent'
            },
            axisTicks: {
                show: false, 
                color: 'transparent'
            }
        }
    }
    var chart = new ApexCharts(
        document.querySelector("#apex-line-chart1"),
        options
    );
    chart.render();

    /* -----  Apex Line2 Chart ----- */
    var options = {
        chart: {
            height: 150,
            type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#9ccc34'],
        series: [{
            data: [50, 60, 40, 60, 67, 61, 62, 82, 103, 84, 54, 65]
        }],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 4
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], opacity: .2
            },
            borderColor: 'transparent'
        },
        yaxis: {
            labels: {
                show: false
            },
            min: 0
        },
        xaxis: {
            labels: {
                show: false
            },
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: {
                show: false, 
                color: 'transparent'
            },
            axisTicks: {
                show: false, 
                color: 'transparent'
            }
        }
    }
    var chart = new ApexCharts(
        document.querySelector("#apex-line-chart2"),
        options
    );
    chart.render();

    /* -----  Apex Line3 Chart ----- */
    var options = {
        chart: {
            height: 150,
            type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#acacb4'],
        series: [{
            data: [50, 60, 40, 60, 67, 61, 62, 82, 103, 84, 54, 65]
        }],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 4
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], opacity: .2
            },
            borderColor: 'transparent'
        },
        yaxis: {
            labels: {
                show: false
            },
            min: 0
        },
        xaxis: {
            labels: {
                show: false
            },
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: {
                show: false, 
                color: 'transparent'
            },
            axisTicks: {
                show: false, 
                color: 'transparent'
            }
        }
    }
    var chart = new ApexCharts(
        document.querySelector("#apex-line-chart3"),
        options
    );
    chart.render();

    /* -- User Slider -- */
    $('.user-slider').slick({
        arrows: true,
        dots: false,
        infinite: true,
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<i class="ri-arrow-left-s-line"></i>',
        nextArrow: '<i class="ri-arrow-right-s-line"></i>'
    });

    /* -- Orders Country Slider -- */
    $('.orders-country-slider').slick({
        arrows: true,
        dots: false,
        infinite: true,
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<i class="feather icon-chevron-left"></i>',
        nextArrow: '<i class="feather icon-chevron-right"></i>'
    });
    
});