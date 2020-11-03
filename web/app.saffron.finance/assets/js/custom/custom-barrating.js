/*
----------------------------------
    : Custom - Bar Rating js :
----------------------------------
*/
"use strict";
$(document).ready(function() {    
    function ratingEnable() {
        /* -- Rating 1 to 10 -- */
        $('#rating-1to10').barrating('show', {
            theme: 'bars-1to10'
        });
        /* -- Rating Movie -- */
        $('#rating-movie').barrating('show', {
            theme: 'bars-movie'
        });
        $('#rating-movie').barrating('set', 'Mediocre');
        /* -- Rating Square -- */
        $('#rating-square').barrating('show', {
            theme: 'bars-square',
            showValues: true,
            showSelectedRating: false
        });
        /* -- Rating Pill -- */
        $('#rating-pill').barrating('show', {
            theme: 'bars-pill',
            initialRating: 'A',
            showValues: true,
            showSelectedRating: false,
            allowEmpty: true,
            emptyValue: '-- no rating selected --',
            onSelect: function(value, text) {
                alert('Selected rating: ' + value);
            }
        });
        /* -- Rating Reversed -- */
        $('#rating-reversed').barrating('show', {
            theme: 'bars-reversed',
            showSelectedRating: true,
            reverse: true
        });
        /* -- Rating Horizontal -- */
        $('#rating-horizontal').barrating('show', {
            theme: 'bars-horizontal',
            reverse: true,
            hoverState: false
        });
        /* -- Rating Font Awesome -- */
        $('#rating-fontawesome').barrating({
            theme: 'fontawesome-stars',
            showSelectedRating: false
        });
        /* -- Rating css -- */
        $('#rating-css').barrating({
            theme: 'css-stars',
            showSelectedRating: false
        });
        /* -- Rating Bootstrap -- */
        $('#rating-bootstrap').barrating({
            theme: 'bootstrap-stars',
            showSelectedRating: false
        });
        var currentRating = $('#rating-fontawesome-o').data('current-rating');
        $('.stars-example-fontawesome-o .current-rating')
            .find('span')
            .html(currentRating);
        $('.stars-example-fontawesome-o .clear-rating').on('click', function(event) {
            event.preventDefault();
            $('#rating-fontawesome-o')
                .barrating('clear');
        });
        $('#rating-fontawesome-o').barrating({
            theme: 'fontawesome-stars-o',
            showSelectedRating: false,
            initialRating: currentRating,
            onSelect: function(value, text) {
                if (!value) {
                    $('#rating-fontawesome-o')
                        .barrating('clear');
                } else {
                    $('.stars-example-fontawesome-o .current-rating')
                        .addClass('hidden');

                    $('.stars-example-fontawesome-o .your-rating')
                        .removeClass('hidden')
                        .find('span')
                        .html(value);
                }
            },
            onClear: function(value, text) {
                $('.stars-example-fontawesome-o')
                    .find('.current-rating')
                    .removeClass('hidden')
                    .end()
                    .find('.your-rating')
                    .addClass('hidden');
            }
        });
    }
    function ratingDisable() {
        $('select').barrating('destroy');
    }
    $('.rating-enable').click(function(event) {
        event.preventDefault();
        ratingEnable();
        $(this).addClass('deactivated');
        $('.rating-disable').removeClass('deactivated');
    });
    $('.rating-disable').click(function(event) {
        event.preventDefault();
        ratingDisable();
        $(this).addClass('deactivated');
        $('.rating-enable').removeClass('deactivated');
    });
    ratingEnable();
});