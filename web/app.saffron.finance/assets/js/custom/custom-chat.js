/*
-----------------------------
    : Custom - Chat js :
-----------------------------
*/
"use strict";
$(document).ready(function() {
    $('.chat-user-list ul').slimscroll({
        height: '565',
        position: 'right',
        size: "7px",
        color: '#CFD8DC'
    });
    $('.chat-body').slimscroll({
        height: '510',
        position: 'right',
        size: "7px",
        color: '#CFD8DC'
    });
});