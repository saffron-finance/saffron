/*
------------------------------
    : Custom - Toasts js :
------------------------------
*/
"use strict";
$(document).ready(function() {
    /* -- Toasts - Simple -- */
    $("#simple-toasts").appendTo($("body")), 
    $("#simple-toasts").toast({
        delay: 1000
    }),
    $("#simple-toasts-btn").click(function() {
        $("#simple-toasts").toast("show")
    })
    /* -- Toasts - Top Right -- */
    $("#top-right-toasts").appendTo($("body")), 
    $("#top-right-toasts").toast({
        delay: 1000
    }),
    $("#top-right-toasts-btn").click(function() {
        $("#top-right-toasts").toast("show")
    })
    /* -- Toasts - Bottom Right -- */
    $("#bottom-right-toasts").appendTo($("body")), 
    $("#bottom-right-toasts").toast({
        delay: 1000
    }),
    $("#bottom-right-toasts-btn").click(function() {
        $("#bottom-right-toasts").toast("show")
    })
    /* -- Toasts - Bottom Left -- */  
    $("#bottom-left-toasts").appendTo($("body")), 
    $("#bottom-left-toasts").toast({
        delay: 1000
    }),
    $("#bottom-left-toasts-btn").click(function() {
        $("#bottom-left-toasts").toast("show")
    })
    /* -- Toasts - Top Left -- */
    $("#top-left-toasts").appendTo($("body")), 
    $("#top-left-toasts").toast({
        delay: 1000
    }),
    $("#top-left-toasts-btn").click(function() {
        $("#top-left-toasts").toast("show")
    })
    /* -- Toasts - Center -- */
    $("#center-toasts").appendTo($("body")), 
    $("#center-toasts").toast({
        delay: 1000
    }),
    $("#center-toasts-btn").click(function() {
        $("#center-toasts").toast("show")
    })
});