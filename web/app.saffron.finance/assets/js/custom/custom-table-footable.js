/*
---------------------------------------
    : Custom - Table Footable js :
---------------------------------------
*/
"use strict";
$(document).ready(function() {
    /* -- Table - Footable -- */
    $('.foo-basic-table').footable();
    $('.foo-filtering-table').footable();
    $('.foo-pagination-table').footable({
		"columns": $.get('./assets/plugins/footable/columns.json'),
		"rows": $.get('./assets/plugins/footable/rows.json')
	});
});