/*
----------------------------------
    : Custom - Credit Card js :
----------------------------------
*/
"use strict";
$(document).ready(function() {    
    var card = new Card({
	    /* a selector or DOM element for the form where users will */
	    /* be entering their information */
	    form: 'form.card-form', /* *required* */
	    /* a selector or DOM element for the container */
	    /* where you want the card to appear */
	    container: '.card-wrapper', /* *required*  */
	    formSelectors: {
	        numberInput: 'input#cardnumber', /* optional — default input[name="number"] */
	        expiryInput: 'input#cardexpiry', /* optional — default input[name="expiry"] */
	        cvcInput: 'input#cardcvc', /* optional — default input[name="cvc"] */
	        nameInput: 'input#cardfullname' /* optional - defaults input[name="name"] */
	    },
	    width: 200, /* optional — default 350px */
	    formatting: true, /* optional - default true */
	    /* Strings for translation - optional */
	    messages: {
	        validDate: 'valid\ndate', /* optional - default 'valid\nthru' */
	        monthYear: 'mm/yyyy', /* optional - default 'month/year' */
	    },
	    /* Default placeholders for rendered fields - optional */
	    placeholders: {
	        number: '•••• •••• •••• ••••',
	        name: 'Full Name',
	        expiry: '••/••',
	        cvc: '•••'
	    },
	    masks: {
	        cardNumber: '•' /* optional - mask card number */
	    },
	    /* if true, will log helpful messages for setting up Card */
	    debug: false /* optional - default false */
	});
});