// google api key: AIzaSyAC6yk_-cvrYiP_NO4l75OcVcJlRbdZ_Gw

//declaring variables

var map;
var marker;
var longitude;
var latitude;
var locations_obj = [{
  "_id": "57b7e5bdc0091c10b1e3569d",
  "name": "KFC",
  "category": "fast food",
  "postalCode": "123454",
  "__v": 0,
  "latLong": {
    "coordinates": [
      1.32293,
      103.948942
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


var $out = $('#out');
var $btn = $('#btn');


//connecting to google map api
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 17
  });

  //inputing markers
  current_position_marker = new google.maps.Marker({
    position: {
      lat: latitude,
      lng: longitude
    },
    map: map,
  });

  for (var i = 0; i < locations_obj.length; i++) {
    locations = locations_obj[i];
    new_position_marker = new google.maps.Marker({
      position: {
        lat: locations.latLong.coordinates[0],
        lng: locations.latLong.coordinates[1]
      },
      map: map,
    });

  }

}

//getting current location
function currentLocation() {

  if (!navigator.geolocation) {
    $out.append("<p>Geolocation is not supported by your browser</p>");
    return;
  }

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    $out.append('<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>');

    initMap();

  }

  function error() {
    $out.append("Unable to retrieve your location");
  }

  $out.append("<p>Locating…</p>");

  navigator.geolocation.getCurrentPosition(success, error);
}



$btn.click(currentLocation);
