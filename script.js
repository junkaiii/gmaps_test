// google api key: AIzaSyAC6yk_-cvrYiP_NO4l75OcVcJlRbdZ_Gw

//declaring variables

var map;
var longitude;
var latitude;

var $out = $('#out');
var $btn = $('#btn');


//connecting to google map api
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 17
  });
}

//getting current location
function currentLocation() {

  if (!navigator.geolocation){
    $out.append("<p>Geolocation is not supported by your browser</p>");
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
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
