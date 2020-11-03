/*
---------------------------------------
    : Custom - Sinlge Product js :
---------------------------------------
*/
"use strict";
$(document).ready(function() {
    $('.product-box-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        centerMode: true,
        draggable: false,
        asNavFor: '.product-box-nav',
        focusOnChange: true,
        autoplay: false,
    });
    $('.product-box-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-box-for',
        dots: false,
        arrows: false,
        centerMode: true,
        draggable: false,
        focusOnSelect: true,
        autoplay: false,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2
              }
            }
          ]
    });
});