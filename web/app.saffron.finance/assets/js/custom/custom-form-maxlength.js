/*
--------------------------------------
    : Custom - Form MaxLength js :
--------------------------------------
*/
"use strict";
$(document).ready(function() {
    /* -- Form - MaxLength -- */    
    $('#maxlength-default').maxlength({
          warningClass: "badge badge-success",
          limitReachedClass: "badge badge-danger"
    });
    $('#maxlength-threshold').maxlength({
          threshold: 20,
          warningClass: "badge badge-success",
          limitReachedClass: "badge badge-danger"
    });
    $('#maxlength-all-options').maxlength({
          alwaysShow: true,
          threshold: 10,
          warningClass: "badge badge-success",
          limitReachedClass: "badge badge-danger",
          separator: ' of ',
          preText: 'You have ',
          postText: ' chars remaining.',
          validate: true
    });
    $('#maxlength-positions').maxlength({
        alwaysShow: true,
        warningClass: "badge badge-success",
        limitReachedClass: "badge badge-danger",
        placement: 'top-left'
    });
    $('#maxlength-textarea').maxlength({
        alwaysShow: true,
        warningClass: "badge badge-success",
        limitReachedClass: "badge badge-danger"
    });
});