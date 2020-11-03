/*
---------------------------------------
    : Custom - Form Input Mask js :
---------------------------------------
*/
"use strict";
$(document).ready(function() {
    /* -- Form - Input Mask -- */
    $('#inputmask-date').inputmask("date");
    $('#inputmask-time').inputmask("hh:mm");
    $('#inputmask-datetime').inputmask("datetime");
    $('#inputmask-phone').inputmask("(99) 999-999-9999");
    $('#inputmask-zipcode').inputmask("999999");
    $('#inputmask-email').inputmask("email");
    $('#inputmask-decimal').inputmask("decimal");
    $('#inputmask-currency').inputmask("currency");
    $('#inputmask-ip').inputmask("999.999.999.999");
    $('#inputmask-card-number').inputmask("9999 9999 9999 9999");
    $('#inputmask-card-cvv').inputmask("999");
    $('#inputmask-card-date').inputmask("99/99");
});