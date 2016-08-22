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
      1.4052,
      103.9024
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

  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(),
    marker, i;
  var bounds = new google.maps.LatLngBounds();


  // Loop through our array of markers & place each one on the map
  for (i = 0; i < locations_obj.length; i++) {
    var locations = locations_obj[i];
    var position = new google.maps.LatLng(locations.latLong.coordinates[0], locations.latLong.coordinates[1]);
    bounds.extend(position);
    marker = new google.maps.Marker({
      position: position,
      map: map,
      name: locations.name,
      // title: markers[i][0]
    });

    // Allow each marker to have an info window
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        //template for infoWindow content
        //suggestion from http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
        var infoWindowContent =
          '<div class="info_content">' +
          '<h3>' + this.name + '</h3>' +
          '<p>' + this.name + '</p>' + '</div>';
        infoWindow.setContent(infoWindowContent);
        infoWindow.open(map, this);
      };
    })(marker, i));

    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
  }


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

//Get location event listener
$btn.click(getCurrentLocation);


//Setting event listener for search bar
$("#search_bar").keyup(function(e) {
  if (e.keyCode == 13) {

    get_search_info = $("#search_bar").val();
    concat_search = get_search_info.split(" ").join('+');
    console.log('input value is ' + concat_search);
    url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + concat_search + '+Singapore&key=AIzaSyAC6yk_-cvrYiP_NO4l75OcVcJlRbdZ_Gw';

    $.ajax({
      url: url,
      dataType: 'json',
    }).done(function successFunction(data) {
      search_latitude = data.results[0].geometry.viewport.northeast.lat;
      search_longitude = data.results[0].geometry.viewport.northeast.lng;
      console.log('Searched location is ' + search_latitude + ' ' + search_longitude);
    })

      .fail(function failFunction(request, textStatus, errorThrown) {
        console.log('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
      })
      .always(function alwaysFunction() {
        console.log('always function');
      });


    $("#search_bar").val('');
  }
});
