/*
----------------------------------
    : Custom - jsTree js :
----------------------------------
*/
(function() {
    "use strict";
    /* -- Basic Tree -- */
    $('#types-tree').jstree({
        'core' : {
            'themes' : {
                'responsive': false
            },
            'data' : [
                  {
                      "text" : "Olian",
                      "state" : {"opened" : true },
                      "icon" : "ri-folder-3-line",
                      "children" : [
                          {
                            "text" : "Assets",
                            "state" : { "opened" : true },
                            "icon" : "ri-folder-3-line",
                             "children" : [
                                  { "text" : "CSS", "state" : { "opened" : true }, "icon" : "ri-file-3-line" },
                                  { "text" : "JS", "icon" : "ri-file-3-line" },
                                  { "text" : "Fonts", "icon" : "ri-file-3-line" },
                                  { "text" : "Images", "icon" : "ri-file-3-line" },
                                  { 
                                    "text" : "Plugins",                                     
                                    "state" : { "opened" : true },
                                    "icon" : "ri-folder-3-line",  
                                    "children" : [
                                          { "text" : "jQuery", "icon" : "ri-file-3-line" },
                                          { "text" : "Bootstrap", "state" : { "selected" : true, "opened" : true }, "icon" : "ri-file-3-line" }
                                      ]
                                  }
                              ]
                          },
                          {
                            "text" : "Icons",
                            "icon" : "ri-service-line"
                          },
                          {
                            "text" : "Events",
                            "icon" : "ri-calendar-2-fill"
                          },
                          {
                            "text" : "UI Kits",
                            "state" : { "opened" : true },
                            "icon" : "ri-pencil-ruler-line",
                            "children" : [
                                  { "text" : "Buttons", "icon" : "ri-file-3-line" },
                                  { "text" : "Badges", "icon" : "ri-file-3-line" }
                              ]
                          },
                          {
                            "text" : "Forms",
                            "icon" : "ri-file-copy-2-line"
                          },
                          {
                            "text" : "Charts",
                            "icon" : "ri-pie-chart-line"
                          },
                          {
                            "text" : "Pages",
                            "state" : { "opened" : true },
                            "icon" : "ri-pages-line",
                            "children" : [
                                  { "text" : "Coming Soon", "icon" : "ri-file-3-line" },
                                  { "text" : "Maintenance", "icon" : "ri-file-3-line" }
                              ]
                          },
                          {
                            "text" : "Tables",
                            "icon" : "ri-table-line"
                          },
                      ]
                },
                {
                    "text" : "Documents",
                    "state" : { "opened" : true },
                    "icon" : "ri-folder-3-line"
                }
              ]
        },
        'plugins' : ['types']
    });    
    /* -- Checkbox Tree -- */
    $('#checkbox-tree').jstree({
        'core' : {
            'themes' : {
                'responsive': false
            },
            'data' : [
                  {
                      "text" : "Olian",
                      "state" : {"opened" : true },
                      "icon" : "ri-folder-3-line",
                      "children" : [
                          {
                            "text" : "Assets",
                            "state" : { "opened" : true },
                            "icon" : "ri-folder-3-line",
                             "children" : [
                                  { "text" : "CSS", "state" : { "opened" : true }, "icon" : "ri-file-3-line" },
                                  { "text" : "JS", "icon" : "ri-file-3-line" },
                                  { "text" : "Fonts", "icon" : "ri-file-3-line" },
                                  { "text" : "Images", "icon" : "ri-file-3-line" },
                                  { 
                                    "text" : "Plugins",                                     
                                    "state" : { "opened" : true },
                                    "icon" : "ri-folder-3-line",  
                                    "children" : [
                                          { "text" : "jQuery", "icon" : "ri-file-3-line" },
                                          { "text" : "Bootstrap", "state" : { "selected" : true, "opened" : true }, "icon" : "ri-file-3-line" }
                                      ]
                                  }
                              ]
                          },
                          {
                            "text" : "Icons",
                            "icon" : "ri-service-line"
                          },
                          {
                            "text" : "Events",
                            "icon" : "ri-calendar-2-fill"
                          },
                          {
                            "text" : "UI Kits",
                            "state" : { "opened" : true },
                            "icon" : "ri-pencil-ruler-line",
                            "children" : [
                                  { "text" : "Buttons", "icon" : "ri-file-3-line" },
                                  { "text" : "Badges", "icon" : "ri-file-3-line" }
                              ]
                          },
                          {
                            "text" : "Forms",
                            "icon" : "ri-file-copy-2-line"
                          },
                          {
                            "text" : "Charts",
                            "icon" : "ri-pie-chart-line"
                          },
                          {
                            "text" : "Pages",
                            "state" : { "opened" : true },
                            "icon" : "ri-pages-line",
                            "children" : [
                                  { "text" : "Coming Soon", "icon" : "ri-file-3-line" },
                                  { "text" : "Maintenance", "icon" : "ri-file-3-line" }
                              ]
                          },
                          {
                            "text" : "Tables",
                            "icon" : "ri-table-line"
                          },
                      ]
                },
                {
                    "text" : "Documents",
                    "state" : { "opened" : true },
                    "icon" : "ri-folder-3-line"
                }
              ]
        },
        'plugins' : ['types', 'checkbox']
    });    
    /* -- Drag & Drop Tree -- */
    $('#drag-drop-tree').jstree({
        'core' : {
            'themes' : {
                'responsive': false
            },
            'check_callback' : true,
            'data' : [
                  {
                      "text" : "Olian",
                      "state" : {"opened" : true },
                      "icon" : "ri-folder-3-line",
                      "children" : [
                          {
                            "text" : "Assets",
                            "state" : { "opened" : true },
                            "icon" : "ri-folder-3-line",
                             "children" : [
                                  { "text" : "CSS", "state" : { "opened" : true }, "icon" : "ri-file-3-line" },
                                  { "text" : "JS", "icon" : "ri-file-3-line" },
                                  { "text" : "Fonts", "icon" : "ri-file-3-line" },
                                  { "text" : "Images", "icon" : "ri-file-3-line" },
                                  { 
                                    "text" : "Plugins",                                     
                                    "state" : { "opened" : true },
                                    "icon" : "ri-folder-3-line",  
                                    "children" : [
                                          { "text" : "jQuery", "icon" : "ri-file-3-line" },
                                          { "text" : "Bootstrap", "state" : { "selected" : true, "opened" : true }, "icon" : "ri-file-3-line" }
                                      ]
                                  }
                              ]
                          },
                          {
                            "text" : "Icons",
                            "icon" : "ri-service-line"
                          },
                          {
                            "text" : "Events",
                            "icon" : "ri-calendar-2-fill"
                          },
                          {
                            "text" : "UI Kits",
                            "state" : { "opened" : true },
                            "icon" : "ri-pencil-ruler-line",
                            "children" : [
                                  { "text" : "Buttons", "icon" : "ri-file-3-line" },
                                  { "text" : "Badges", "icon" : "ri-file-3-line" }
                              ]
                          },
                          {
                            "text" : "Forms",
                            "icon" : "ri-file-copy-2-line"
                          },
                          {
                            "text" : "Charts",
                            "icon" : "ri-pie-chart-line"
                          },
                          {
                            "text" : "Pages",
                            "state" : { "opened" : true },
                            "icon" : "ri-pages-line",
                            "children" : [
                                  { "text" : "Coming Soon", "icon" : "ri-file-3-line" },
                                  { "text" : "Maintenance", "icon" : "ri-file-3-line" }
                              ]
                          },
                          {
                            "text" : "Tables",
                            "icon" : "ri-table-line"
                          },
                      ]
                },
                {
                    "text" : "Documents",
                    "state" : { "opened" : true },
                    "icon" : "ri-folder-3-line"
                }
              ]
        },
        'plugins' : ['dnd']
    });    
    /* -- Ajax Tree -- */
    $('#ajax-tree').jstree({
        'core' : {
            'animation' : 0,
            'check_callback' : true,
            'force_text' : true,
            'themes' : {
                'responsive': false
            },
            'data' : {
                'url' : function (node) {
                    return node.id === '#' ? './assets/plugins/jstree/ajax_roots.json' : './assets/plugins/jstree/ajax_children.json';
                },
                'data' : function (node) {
                    return { 'id' : node.id };
                }
            }
        },
        "types" : {
            'default' : {
                'icon' : 'ri-folder-3-line'
            },
            'file' : {
                'icon' : 'ri-file-3-line'
            }
        },
        "plugins" : [ "contextmenu", "dnd", "search", "state", "types", "wholerow" ]
    });
})();