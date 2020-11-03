/*
----------------------------------------
    : Custom - Form Colorpicker js :
----------------------------------------
*/
"use strict";
$(document).ready(function() {
    /* -- Form - Color Picker -- */
     $('#default-color').colorpicker({
     	format: 'auto'
     });
     $('#rgb-color').colorpicker();
     $('#initial-color').colorpicker({
     	format: 'auto'
     });
     $('#initial-rgb-color').colorpicker();
     $('#horizontal-color').colorpicker({
     	format: 'auto',
     	horizontal: true
     });
     $('#transparent-color').colorpicker({
     	format: 'auto'
     });
});