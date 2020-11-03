"use strict";
$(document).ready(function() {
    /* -- Form - Touchspin -- */    
    $("#touchspin-value-attribute").TouchSpin();
    $("#touchspin-empty-value").TouchSpin();
    $("#touchspin-postfix").TouchSpin({
        min: 0,
        max: 100,
        step: 0.1,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
        postfix: '%'
    });    
    $("#touchspin-prefix").TouchSpin({
        min: -1000000000,
        max: 1000000000,
        stepinterval: 50,
        maxboostedstep: 10000000,
        prefix: '$'
    });
    $("#touchspin-value-attr-not-set").TouchSpin({
        initval: 40
    });
    $("#touchspin-value-set-explicitly").TouchSpin({
        initval: 40
    });
    $("#touchspin-vertical-btn").TouchSpin({
      verticalbuttons: true
    });
    $("#touchspin-change-btn-class").TouchSpin({
        buttondown_class: "btn btn-rounded btn-primary",
        buttonup_class: "btn btn-rounded  btn-primary"
    });
});