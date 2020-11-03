/*
---------------------------------------------
    : Custom - eCommerce Shop Page js :
---------------------------------------------
*/
"use strict";
$(document).ready(function() {
    /* -- Range Slider - Prefix -- */
    $("#range-slider-prefix").ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 1000,
        from: 0,
        to: 500,
        prefix: "$"
    });
});