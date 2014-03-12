




function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(initialize);
    }
  else{alert("Geolocation is not supported by this browser.");}
  }
  function initialize(position) {
        
        myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: myLocation,
          zoom: 15
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
        var myMarker = new google.maps.Marker({
        	position: myLocation});
         myMarker.push();

        }

      

	google.maps.event.addDomListener(window, 'load', getLocation);

  

    
      

/*
      function getMyLocation()
			{
				
				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(initialize); }
						
					

				else {
					alert("Geolocation is not supported by your web browser.  What a shame!");
				}
			} 

      function initialize(position) {

      var latlon=position.coords.latitude+","+position.coords.longitude;

  var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
  +latlon+"&zoom=14&size=400x300&sensor=false";
  document.getElementById("mapholder").innerHTML="<img src='"+img_url+"'>";

        var mapOptions = {
          center: new google.maps.LatLng(myLat, myLng),
          zoom: 8
          
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }

    */  
     