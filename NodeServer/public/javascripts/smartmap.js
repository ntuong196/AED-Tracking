/* LOADER */
//////////////////////////////////////////////////////////////////
$(window).on("load", function() {
  $(".loader").fadeOut("slow")
})

/* LOADER */
//////////////////////////////////////////////////////////////////
var socket = io()

function startListen() {}

socket.emit("search", {})
//inserts pointer into the map
function addMessage(lat, long) {
  loc = { latlong: false, hits: 0 }
  loc.latlong = new google.maps.LatLng(lat, long)
  addMarker(loc, map, redicon)
}
// setInterval(function () { updatePosition(getLocation()); }, 10000);

function addMarker(loc, map, icon) {
  place = loc.latlong
  marker = new google.maps.Marker({
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: place
  })
  if (loc.hits == 0) {
    marker.icon = icon
    marker.shadow = "http://labs.google.com/ridefinder/images/mm_20_shadow.png"
  }
  index = loc.id
}
/* DASHBOARD CONTROL */
//////////////////////////////////////////////////////////////////
jQuery(document).ready(function($) {
  var alterClass = function() {
    var ww = document.body.clientWidth
    if (ww < 784) {
      $(".content").removeClass("col-8")
      $(".content").addClass("col-12")
    } else {
      $(".content").removeClass("col-12")
      $(".content").addClass("col-8")
    }
  }
  $(window).resize(function() {
    alterClass()
  })
  //Fire it when the page first loads:
  alterClass()
})

function alarmOn() {
  var sound = document.getElementById("audio")
  sound.loop = true
  sound.load()
  sound.play()
}

function alarmOff() {
  var sound = document.getElementById("audio")
  sound.pause()
}

/* BASIC LOCATION SERVICES */
//////////////////////////////////////////////////////////////////
let marker
let poly
let map

const locations = [{ lat: -27.4773824, lng: 153.0292242 }]

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -27.4768784, lng: 153.02841809999998 },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 18
  })
  // Add a style-selector control to the map.
  var styleControl = document.getElementById("style-selector-control")
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(styleControl)

  // Set the map's style to the initial value of the selector.
  var styleSelector = document.getElementById("style-selector")
  map.setOptions({ styles: styles[styleSelector.value] })

  // Apply new JSON when the user selects a different style.
  styleSelector.addEventListener("change", function() {
    map.setOptions({ styles: styles[styleSelector.value] })
  })
  poly = new google.maps.Polyline({
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 3
  })
  poly.setMap(map)

  // Add a listener for the click event
  map.addListener("click", addLatLng)

  //   Autocomplete
  var input = document.getElementById("searchInput")
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input)

  var autocomplete = new google.maps.places.Autocomplete(input)
  autocomplete.bindTo("bounds", map)

  var infowindow = new google.maps.InfoWindow()

  var markers = locations.map(function(location) {
    return new google.maps.Marker({
      position: location,
      label: "A"
    })
  })

  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
  })

  marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
    animation: google.maps.Animation.DROP
  })
  marker.addListener("click", toggleBounce)

  autocomplete.addListener("place_changed", function() {
    infowindow.close()
    marker.setVisible(false)
    var place = autocomplete.getPlace()
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry")
      return
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport)
    } else {
      map.setCenter(place.geometry.location)
      map.setZoom(17)
    }
    marker.setIcon({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    })
    marker.setPosition(place.geometry.location)
    marker.setVisible(true)

    var address = ""
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          ""
      ].join(" ")
    }

    infowindow.setContent(
      "<div><strong>" + place.name + "</strong><br>" + address
    )
    infowindow.open(map, marker)

    // Unused code
    document.getElementById("location").innerHTML =
      "Address: " + place.formatted_address
    document.getElementById("latlon").innerHTML =
      "Latitude, longitude: " +
      place.geometry.location.lat() +
      ", " +
      place.geometry.location.lng()
  })
}
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null)
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE)
  }
}

// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
  const path = poly.getPath()

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng)

  // Add a new marker at the new plotted point on the polyline.
  const marker = new google.maps.Marker({
    position: event.latLng,
    title: "#" + path.getLength(),
    map: map
  })
}

const styles = {
  default: null,
  silver: [
    {
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }]
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }]
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#f5f5f5" }]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#dadada" }]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }]
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }]
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }]
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c9c9c9" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }]
    }
  ],

  night: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }]
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }]
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }]
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }]
    }
  ],

  retro: [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#c9b2a6" }]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [{ color: "#dcd2be" }]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ae9e90" }]
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#93817c" }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [{ color: "#a5b076" }]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#447530" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#f5f1e6" }]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#fdfcf8" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#f8c967" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#e9bc62" }]
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#e98d58" }]
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [{ color: "#db8555" }]
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#806b63" }]
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }]
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8f7d77" }]
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ebe3cd" }]
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }]
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#b9d3c2" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#92998d" }]
    }
  ],

  hiding: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }]
    }
  ]
}

/* NAVIGATION CONTROL - DELETED*/
//////////////////////////////////////////////////////////////////
// let opened = 0

// /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
// function openNav() {
//   document.getElementById("mySidenav").style.width = "250px"
//   document.getElementById("main").style.marginLeft = "250px"
// }

// /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
// function closeNav() {
//   document.getElementById("mySidenav").style.width = "0"
//   document.getElementById("main").style.marginLeft = "0"
// }

// function toogleSideBar() {
//   if (opened) {
//     closeNav()
//     opened = 0
//   } else {
//     openNav()
//     opened = 1
//   }
// }
