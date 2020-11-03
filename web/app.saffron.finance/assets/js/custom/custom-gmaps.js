/*
----------------------------------
    : Custom - Map Google js :
----------------------------------
*/
"use strict";
  $(document).ready(function() {
      /* -- Google Map - Basic Map -- */
      var basicMap;
      basicMap = new GMaps({
          el: '#basic-map',
          lat: -12.043333,
          lng: -77.028333,
          scrollwheel: false
      });
      /* -- Google Map - Markers Map -- */
      var markerMap;
      markerMap = new GMaps({
          el: '#markers-map',
          lat: -12.043333,
          lng: -77.028333,
          scrollwheel: false
      });
      markerMap.addMarker({
          lat: -12.043333,
          lng: -77.028333,
          title: 'Marker with InfoWindow',
          infoWindow: {
              content: '<p>Welcome here</p>'
          }
      });
      /* -- Google Map - Polylines Map -- */
      var polylinesMap;
      polylinesMap = new GMaps({
        el: '#polylines-map',
        lat: -12.043333,
        lng: -77.028333,
        click: function(e){
          
        }
      });
      var polylinesPath = [[-12.044012922866312, -77.02470665341184], [-12.05449279282314, -77.03024273281858], [-12.055122327623378, -77.03039293652341], [-12.075917129727586, -77.02764635449216], [-12.07635776902266, -77.02792530422971], [-12.076819390363665, -77.02893381481931], [-12.088527520066453, -77.0241058385925], [-12.090814532191756, -77.02271108990476]];
      polylinesMap.drawPolyline({
        path: polylinesPath,
        strokeColor: '#0442ba',
        strokeOpacity: 0.6,
        strokeWeight: 6
      });
      /* -- Google Map - Polygon Map -- */
     var polygonMap;
      polygonMap = new GMaps({
        el: '#polygon-map',
        lat: -12.043333,
        lng: -77.028333,
      });
      var polygonPath = [[-12.040397656836609,-77.03373871559225], [-12.040248585302038,-77.03993927003302], [-12.050047116528843,-77.02448169303511], [-12.044804866577001,-77.02154422636042]];
      var polygon = polygonMap.drawPolygon({
        paths: polygonPath,
        strokeColor: '#0442ba',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#0442ba',
        fillOpacity: 0.6
      });
      /* -- Google Map - Route Map -- */
      var routeMap;
      routeMap = new GMaps({
        el: '#route-map',
        lat: -12.043333,
        lng: -77.028333,
      });
      routeMap.drawRoute({
        origin: [-12.044012922866312, -77.02470665341184],
        destination: [-12.090814532191756, -77.02271108990476],
        travelMode: 'driving',
        strokeColor: '#0442ba',
        strokeOpacity: 0.6,
        strokeWeight: 6
      });
      /* -- Google Map - Search Locations Map -- */
      var mapGeo = new GMaps({
          div: '#mapGeo',
          lat: -12.043333,
          lng: -77.028333,
      });
      $('#geocoding_form').submit(function(e) {
          e.preventDefault();
          GMaps.geocode({
              address: $('#address').val().trim(),
              callback: function(results, status) {
                  if (status == 'OK') {
                      var latlng = results[0].geometry.location;
                      mapGeo.setCenter(latlng.lat(), latlng.lng());
                      mapGeo.addMarker({
                          lat: latlng.lat(),
                          lng: latlng.lng()
                      });
                  }
              }
          });
      });      
      /* -- Google Map - Panoramas Map -- */
      var panoramasMap;
      panoramasMap = GMaps.createPanorama({
          el: '#panoramas-map',
          lat : 42.3455,
          lng : -71.0983
      });
});