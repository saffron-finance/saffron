/*
--------------------------------
    : Custom - Gallery js :
--------------------------------
*/
"use strict";
$(document).ready(function() {
    $(window).on('load', function() {
      	var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        columnWidth: 160,
        horizontalOrder: true
        });      
    	$("body").on("click", ".gallery-filter a", function() { 		  
	        $('.gallery-filter a.current').removeClass('current');
	        $(this).addClass('current');
	        var filterValue = $( this ).attr('data-filter');
	        $grid.isotope({ filter: filterValue });
      });
    });
});