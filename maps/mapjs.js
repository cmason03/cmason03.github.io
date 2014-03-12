
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(initialize);
    }
  else{alert("Geolocation is not supported by this browser.");}
  }
  function initialize(position) {
        var mapOptions = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 15
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }

   function dropPersonPin(position) {

   	var image = 'MBTApic.png';
 var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
  var beachMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image
});
   }

google.maps.event.addDomListener(window, 'load', initialize);
	
  

    
     