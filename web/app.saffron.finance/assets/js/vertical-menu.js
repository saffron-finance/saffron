"use strict";

function updateMenuTabs() {
	
    var a = window.location;
    console.log("updateMenuTabs();",a.href);
    
    var anchors = document.querySelectorAll(".vertical-menu a");
    for (var i=0;i<anchors.length;i++) {
    	if(anchors[i].href==a.href) {
    		anchors[i].classList.add("active");
    		anchors[i].parentElement.classList.add("active");
    	} else {
    		anchors[i].classList.remove("active");
    		anchors[i].parentElement.classList.remove("active");
    	}
    }
	//TODO: only connect if requested, and use local storage to remember last connection type
	let needsWalletConnect=["#dashboard","#liquidity","#redeem"];
	if(!ethConnected && needsWalletConnect.includes(window.location.hash.toLowerCase())) connectWallet();
    
}

$(document).ready(function() {  
	/* Automagically jump on good tab based on anchor; for page reloads or links */
	if(location.hash) {
		$('a[href="' + location.hash + '"]').tab('show');         
	} else {
		$('a[href="#dashboard"]').tab('show');   
	}

	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		location.hash = $(e.target).attr('href').substr(1);
		console.log("shown.bs.tab",location.hash);
		scrollTo(0,0);     
		updateMenuTabs();
	});
	
	$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
		console.log("show.bs.tab");
	});	
	
	$('a[data-toggle="tab"]').on('hide.bs.tab', function(e) {
		console.log("hide.bs.tab");
	});	
	
	$('a[data-toggle="tab"]').on('hidden.bs.tab', function(e) {
		console.log("hidden.bs.tab");
	});	

	/* Update hash based on tab, basically restores browser default behavior to fix bootstrap tabs */
	$(document.body).on("click", "a[data-toggle]", function(event) {
		location.hash = this.getAttribute("href");
	});

	/* on history back activate the tab of the location hash if exists or the default tab if no hash exists */   
	$(window).on('popstate', function() {
		//var anchor = location.hash || $("a[data-toggle=tab]").first().attr("href");
		var anchor = location.hash;
		$('a[href="' + anchor + '"]').tab('show');
	});   

});//OnReady

