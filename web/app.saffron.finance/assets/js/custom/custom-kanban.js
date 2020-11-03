/*
-------------------------------------
    : Custom - Kanban Board js :
-------------------------------------
*/
"use strict";
$(document).ready(function() {    
  dragula([document.getElementById("dragula-left"),document.getElementById("dragula-right")]),dragula([document.getElementById("kanban-board-one"),document.getElementById("kanban-board-two"),document.getElementById("kanban-board-three"),document.getElementById("kanban-board-four")]);
});