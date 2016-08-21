

//declaring variables

var $out = $('#out');
var $btn = $('#btn');
var longitude;
var latitude;
var map;

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


// Asynchronously loading Gmaps API
jQuery(function($) {
  var script = document.createElement('script');
  script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyAC6yk_-cvrYiP_NO4l75OcVcJlRbdZ_Gw&callback=initialize";
  document.body.appendChild(script);
});

//loads GMAPS initial view of Singapore
function initialize() {
  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: {
      //Singapore
      lat: 1.352083,
      lng: 103.819836
    },
    zoom: 10
  });
}

//zooms in to current location
function showCurrentLocation() {
  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: {
      //Singapore
      lat: latitude,
      lng: longitude
    },
    zoom: 15
  });

  current_position_marker = new google.maps.Marker({
    position: {
      lat: latitude,
      lng: longitude
    },
    map: map,
  });

  //adds surrounding data
  
}




//Getting current location
function getCurrentLocation() {

  if (!navigator.geolocation) {
    $out.append("<p>Geolocation is not supported by your browser</p>");
    return;
  }

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    $out.append('<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>');
    showCurrentLocation();
  }

  function error() {
    $out.append("Unable to retrieve your location");
  }

  $out.append("<p>Locating…</p>");
  navigator.geolocation.getCurrentPosition(success, error); //getCurrentPosition is GMAPS function

}

$btn.click(getCurrentLocation);
