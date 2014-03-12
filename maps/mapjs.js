

   
      var myLat = 0;
      var myLong= 0;


    
      


      function getMyLocation()
			{
				
				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(function(position) {
						var myLat = position.coords.latitude;
						var myLng = position.coords.longitude;
						renderMap();
						alert("getMyLocation is working!")
						
						
					});
				}

				else {
					alert("Geolocation is not supported by your web browser.  What a shame!");
				}
			} 

      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(myLat, myLng),
          zoom: 8
          
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }
     