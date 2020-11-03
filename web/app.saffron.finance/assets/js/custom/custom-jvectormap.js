/*
-----------------------------------
    : Custom - Map jVector js :
-----------------------------------
*/
"use strict";
$(document).ready(function() {
    /* -- jVector Map - World Map -- */
    $('#world-map').vectorMap({
        map: 'world_mill_en',
        backgroundColor: 'transparent',
        markerStyle: {
          initial: {
            fill: '#0442ba',
            stroke: '#0442ba',
            "fill-opacity": 1,
            "stroke-width": 15,
            "stroke-opacity": 0.2
          }
        },
        markers: [
          {latLng: [37.18, -93.35], name: 'United States'},
          {latLng: [61.52, 105.31], name: 'Russia'},          
          {latLng: [-25.27, 133.77], name: 'Australia'},
          {latLng: [-38.41, -63.61], name: 'Argentina'},
          {latLng: [20.59, 78.96], name: 'India'},          
        ],
        focusOn: {
          x: 0,
          y: 0,
          scale: 1
        },
        
        regionStyle: {
            initial: {
                fill: '#f4f5f7'
            }
        }
    }); 
    /* -- jVector Map - USA Map --  */
    $('#usa').vectorMap({map: 'us_aea_en',backgroundColor: 'transparent',
        regionStyle: {
            initial: {
                fill: '#0442ba'
            }
    }});
    /* -- jVector Map - India Map -- */
    $('#india').vectorMap({map: 'in_mill',backgroundColor: 'transparent',
        regionStyle: {
            initial: {
                fill: '#f62525'
            }
    }});
    /* -- jVector Map - Australia Map -- */
    $('#australia').vectorMap({map : 'au_mill',backgroundColor : 'transparent',
        regionStyle : {
            initial : {
                fill : '#9ccc34'
            }
    }});
    /* -- jVector Map - Argentina Map -- */
    $('#argentina').vectorMap({map: 'ar_mill',backgroundColor: 'transparent',
        regionStyle: {
            initial: {
                fill: '#fcbc04'
            }
    }});
    /* -- jVector Map - Russia Map -- */
    $('#russia').vectorMap({map: 'ru_mill',backgroundColor: 'transparent',
        regionStyle: {
            initial: {
                fill: '#25bef6'
            }
    }});
    /* -- jVector Map - South Africa Map -- */
    $('#south-africa').vectorMap({map: 'za_mill',backgroundColor: 'transparent',
        regionStyle: {
            initial: {
                fill: '#acacb4'
            }
    }});
});