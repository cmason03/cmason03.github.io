

   
      var myLat = 0;
      var myLong= 0;


    }
      

/*
      function getMyLocation()
			{
				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(function(position) {
						myLat = position.coords.latitude;
						myLng = position.coords.longitude;
						renderMap();
					});
				}

				else {
					alert("Geolocation is not supported by your web browser.  What a shame!");
				}
			}
*/

      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(16, 150.644),
          zoom: 8
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }
     