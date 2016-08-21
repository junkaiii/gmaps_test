// google api key: AIzaSyAC6yk_-cvrYiP_NO4l75OcVcJlRbdZ_Gw

//declaring variables

var map;
var marker;
var longitude;
var latitude;
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

var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';


var $out = $('#out');
var $btn = $('#btn');


//connecting to google map api

function initMap() {

  //displaying base map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 17
  });

  //inputing current location marker
  current_position_marker = new google.maps.Marker({
    position: {
      lat: latitude,
      lng: longitude
    },
    map: map,
    //label: label_name,

  });


  //displaying markers in locations_obj(json_reply)
  for (var i = 0; i < locations_obj.length; i++) {

    locations = locations_obj[i];

    new_position_marker = new google.maps.Marker({
      position: {
        lat: locations.latLong.coordinates[0],
        lng: locations.latLong.coordinates[1]
      },
      map: map,
      title: locations.name,
      animation: google.maps.Animation.DROP,
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
