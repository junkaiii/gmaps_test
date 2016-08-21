// google api key: AIzaSyAC6yk_-cvrYiP_NO4l75OcVcJlRbdZ_Gw

jQuery(function($) {

  // Asynchronously loading Google Map API
  var script = document.createElement('script');
  script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyAC6yk_-cvrYiP_NO4l75OcVcJlRbdZ_Gw&callback=initialize";
  document.body.appendChild(script);
});

function initialize() {

  //declaring variables
  var map;
  var bounds = new google.maps.LatLngBounds(); //setting zoom boundary
  var mapOptions = {
    mapTypeId: 'roadmap'
  };
  var marker;
  var longitude;
  var latitude;

  //simulated json reply
  var locations_obj = [{
    "_id": "57b7e5bdc0091c10b1e3569d",
    "name": "MACS",
    "category": "fast food",
    "postalCode": "123454",
    "__v": 0,
    "latLong": {
      "coordinates": [
        1.403991,
        103.905664
      ],
      "type": "Point"
    },
  }, {
    "_id": "57b7e5bdc0091c10b1e3569d",
    "name": "KFC",
    "category": "fast food",
    "postalCode": "123454",
    "__v": 0,
    "latLong": {
      "coordinates": [
        1.322143,
        103.949627
      ],
      "type": "Point"
    },
  }];

  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  map.setTilt(45);


  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(),
    marker, i;

  // Loop through our array of markers & place each one on the map
  for (i = 0; i < locations_obj.length; i++) {
    var locations = locations_obj[i];
    var position = new google.maps.LatLng(locations.latLong.coordinates[0], locations.latLong.coordinates[1]);
    bounds.extend(position);
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: locations.name
    });

    // Allow each marker to have an info window
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infoWindow.setContent(locations.category);
        infoWindow.open(map, marker);
      };
    })(marker, i));

    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
  }

  // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
  var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
    this.setZoom(12);
    google.maps.event.removeListener(boundsListener);
  });
}
