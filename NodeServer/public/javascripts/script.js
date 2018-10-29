/* NAVIGATION CONTROL */
//////////////////////////////////////////////////////////////////
let opened = 0

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px"
  document.getElementById("main").style.marginLeft = "250px"
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0"
  document.getElementById("main").style.marginLeft = "0"
}

function toogleSideBar() {
  if (opened) {
    closeNav()
    opened = 0
  } else {
    openNav()
    opened = 1
  }
}

/* BASIC LOCATION SERVICES */
//////////////////////////////////////////////////////////////////
var marker

var locations = [
  { lat: -27.4773824, lng: 153.0292242 },
  { lat: -27.4771133, lng: 153.0283349 },
  { lat: -27.4779801, lng: 153.0289722 },
  { lat: -27.4761435, lng: 153.0279634 },
  { lat: -27.4764346, lng: 153.0274477 },
  { lat: -27.4771492, lng: 153.0273202 },
  { lat: -27.4766894, lng: 153.0278129 },
  { lat: -27.4768749, lng: 153.0277575 },
  { lat: -27.4777743, lng: 153.0296884 },
  { lat: -27.4782384, lng: 153.0280963 }
]

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -27.4768784, lng: 153.02841809999998 },
    zoom: 18
  })

  //   Autocomplete
  var input = document.getElementById("searchInput")
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input)

  var autocomplete = new google.maps.places.Autocomplete(input)
  autocomplete.bindTo("bounds", map)

  var infowindow = new google.maps.InfoWindow()

  var markers = locations.map(function(location) {
    return new google.maps.Marker({
      position: location,
      label: "A",
      icon: { url: "http://maps.google.com/mapfiles/ms/micons/red.png" }
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

    document.getElementById("location").innerHTML =
      "Address: " + place.formatted_address
    document.getElementById("latlon").innerHTML =
      "Latitude, longitude: " +
      place.geometry.location.lat() +
      ", " +
      place.geometry.location.lng()

    if (
      place.geometry.location.lat() == -27.477357 &&
      place.geometry.location.lng() == 153.028415
    ) {
      document.getElementById("status").style.visibility = "visible"
      document.getElementById("statusGen").style.visibility = "visible"
      document.getElementById("aedNum").innerHTML = "Number of AED: 9"
    }
    if (
      place.geometry.location.lat() == -27.4509016 &&
      place.geometry.location.lng() == 153.01691170000004
    ) {
      document.getElementById("status", "statusGen").style.visibility =
        "visible"
      document.getElementById("aedNum").innerHTML = "Number of AED: 10"
    }
    if (
      place.geometry.location.lat() == -27.477357 &&
      place.geometry.location.lng() == 153.028415
    ) {
      document.getElementById("status", "statusGen").style.visibility =
        "visible"
      document.getElementById("aedNum").innerHTML = "Number of AED: 11"
    }
  })
}
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null)
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE)
  }
}
