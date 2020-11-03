/*
------------------------------------------
    : Custom - Onboarding Screens js :
------------------------------------------
*/
"use strict";
$(document).ready(function() {	
	$('#onboardingScreens').modal('show');
	if ($('#onboardingScreens .onboard-screen').length) {
		$('#onboardingScreens .onboard-screen').slick({
			arrows: true,
			dots: true,
			infinite: false,
			adaptiveHeight: true,
			slidesToShow: 1,
			slidesToScroll: 1,
	    	prevArrow: '<button type="button" class="slick-prev btn btn-primary-rgba"><i class="ri-arrow-left-line mr-2"></i>Previous</button>',
	    	nextArrow: '<button type="button" class="slick-next btn btn-primary">Next<i class="ri-arrow-right-line ml-2"></i></button>'
		});
	    $('#onboardingScreens').on('shown.bs.modal', function (e) {
	    	$('#onboardingScreens .onboard-screen').slick('setPosition');
	    });
  	}
});