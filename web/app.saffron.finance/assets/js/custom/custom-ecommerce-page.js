/*
--------------------------------------
    : Custom - eCommerce Page js :
--------------------------------------
*/
"use strict";
$(document).ready(function() {
    /* --- All Products --- */
    $('#allproducts').DataTable( {
         "ordering": false, 
         "searching": true,
         responsive: true
    } );
});