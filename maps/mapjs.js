var numStations = 0;
var parsed = [];
var map;
var stationLocation= [];
var myLocation;
var distancesAndStation=[];



function parse() {
	string = '[{"line":"Blue","station":"Airport","lat":42.374262,"lng":-71.030395},{"line":"Blue","station":"Aquarium","lat":42.359784,"lng":-71.051652},{"line":"Blue","station":"Beachmont","lat":42.39754234,"lng":-70.99231944},{"line":"Blue","station":"Bowdoin","lat":42.361365,"lng":-71.062037},{"line":"Blue","station":"Government Center","lat":42.359705,"lng":-71.059215},{"line":"Blue","station":"Maverick","lat":42.36911856,"lng":-71.03952958},{"line":"Blue","station":"Orient Heights","lat":42.386867,"lng":-71.004736},{"line":"Blue","station":"Revere Beach","lat":42.40784254,"lng":-70.99253321},{"line":"Blue","station":"State Street","lat":42.358978,"lng":-71.057598},{"line":"Blue","station":"Suffolk Downs","lat":42.39050067,"lng":-70.99712259},{"line":"Blue","station":"Wonderland","lat":42.41342,"lng":-70.991648},{"line":"Blue","station":"Wood Island","lat":42.3796403,"lng":-71.02286539},{"line":"Orange","station":"Back Bay","lat":42.34735,"lng":-71.075727},{"line":"Orange","station":"Chinatown","lat":42.352547,"lng":-71.062752},{"line":"Orange","station":"Community College","lat":42.373622,"lng":-71.069533},{"line":"Orange","station":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"line":"Orange","station":"Forest Hills","lat":42.300523,"lng":-71.113686},{"line":"Orange","station":"Green Street","lat":42.310525,"lng":-71.107414},{"line":"Orange","station":"Haymarket","lat":42.363021,"lng":-71.05829},{"line":"Orange","station":"Jackson Square","lat":42.323132,"lng":-71.099592},{"line":"Orange","station":"Malden Center","lat":42.426632,"lng":-71.07411},{"line":"Orange","station":"Mass Ave","lat":42.341512,"lng":-71.083423},{"line":"Orange","station":"North Station","lat":42.365577,"lng":-71.06129},{"line":"Orange","station":"Oak Grove","lat":42.43668,"lng":-71.071097},{"line":"Orange","station":"Roxbury Crossing","lat":42.331397,"lng":-71.095451},{"line":"Orange","station":"Ruggles","lat":42.336377,"lng":-71.088961},{"line":"Orange","station":"State Street","lat":42.358978,"lng":-71.057598},{"line":"Orange","station":"Stony Brook","lat":42.317062,"lng":-71.104248},{"line":"Orange","station":"Sullivan","lat":42.383975,"lng":-71.076994},{"line":"Orange","station":"Tufts Medical","lat":42.349662,"lng":-71.063917},{"line":"Orange","station":"Wellington","lat":42.40237,"lng":-71.077082},{"line":"Red","station":"Alewife","lat":42.395428,"lng":-71.142483},{"line":"Red","station":"Andrew","lat":42.330154,"lng":-71.057655},{"line":"Red","station":"Ashmont","lat":42.284652,"lng":-71.064489},{"line":"Red","station":"Braintree","lat":42.2078543,"lng":-71.0011385},{"line":"Red","station":"Broadway","lat":42.342622,"lng":-71.056967},{"line":"Red","station":"Central Square","lat":42.365486,"lng":-71.103802},{"line":"Red","station":"Charles/MGH","lat":42.361166,"lng":-71.070628},{"line":"Red","station":"Davis","lat":42.39674,"lng":-71.121815},{"line":"Red","station":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"line":"Red","station":"Fields Corner","lat":42.300093,"lng":-71.061667},{"line":"Red","station":"Harvard Square","lat":42.373362,"lng":-71.118956},{"line":"Red","station":"JFK/UMass","lat":42.320685,"lng":-71.052391},{"line":"Red","station":"Kendall/MIT","lat":42.36249079,"lng":-71.08617653},{"line":"Red","station":"North Quincy","lat":42.275275,"lng":-71.029583},{"line":"Red","station":"Park Street","lat":42.35639457,"lng":-71.0624242},{"line":"Red","station":"Porter Square","lat":42.3884,"lng":-71.119149},{"line":"Red","station":"Quincy Adams","lat":42.233391,"lng":-71.007153},{"line":"Red","station":"Quincy Center","lat":42.251809,"lng":-71.005409},{"line":"Red","station":"Savin Hill","lat":42.31129,"lng":-71.053331},{"line":"Red","station":"Shawmut","lat":42.29312583,"lng":-71.06573796},{"line":"Red","station":"South Station","lat":42.352271,"lng":-71.055242},{"line":"Red","station":"Wollaston","lat":42.2665139,"lng":-71.0203369}]' ;

	parsed=JSON.parse(string);
	numStations = Object.keys(parsed).length;
	
	for( var i=1; i<numStations; i++){
			stationLocation[i] = new google.maps.LatLng(parsed[i].lat, parsed[i].lng);
			
	}
	
}
function getLocation(){
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
       
  map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
  addLineMarkers();
  
		}



function createMarker(pos) {
    var marker = new google.maps.Marker({       
        position: pos, 
        map: map     
    }); 
    google.maps.event.addListener(marker, 'click', function() { 
       alert("I am marker " + marker.title); 
    }); 
    return marker;  
}

function addLineMarkers(){
	var closestStation = closestStation();
	console.log(closestStation);
	var line;
	for( var i=1; i<numStations; i++){
		if(parsed[i].station == closestStation){
			line = parsed[i].line;
			console.log(line);
			for(var j=1; j<numstations; j++){
				console.log(stationLocation[j])
				createMarker(stationLocation[j]);
			}
		}
	}

}

function trainPins(line, googleMap){

	for( var i=1; i<numStations; i++){
		if(parsed[i].line == line){	
			stationLocation = new google.maps.LatLng(parsed[i].lat, parsed[i].lng);
			createMarker(stationLocation, line, googleMap);
			}

	}
}


 
function getDistance(myLocation,stationLocation){

Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

var lat2 = stationLocation.A; 
var lon2 = stationLocation.k; 
var lat1 = myLocation.A; 
var lon1 = myLocation.k; 

var R = 6371; 
var x1 = lat2-lat1;
var dLat = x1.toRad();  
var x2 = lon2-lon1;
var dLon = x2.toRad(); 
var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
var d = R * c * .621371; //.621371 converts km to miles


return(d);
}

function closestStation(){
	var distanceArray =[];
	var closest=0;
	var closestStation;
	for(var i =1; i<numStations; i++){
		distancesAndStation[i] = { "distance": getDistance(myLocation, stationLocation[i]), "station": parsed[i].station };
		distanceArray.push(getDistance(myLocation, stationLocation[i]));	
	}
	

	closest= Math.min.apply(Math,distanceArray);
	for(var i =1; i<numStations; i++){
		if (distancesAndStation[i].distance === closest){
			closestStation = distancesAndStation[i].station;
		}
	}

}

	google.maps.event.addDomListener(window, 'load', getLocation);

  

    
     
     