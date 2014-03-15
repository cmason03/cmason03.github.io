var numStations = 0;
var parsed = [];
var map;
var stationLocation= [];
var myLocation;
var distancesAndStation=[];
var scheduleData = [];
var line;



function parse() {

	//redline are the only stations in order (for the sake of time), delete the 4 stations that branch off
	string = '[{"line":"Blue","station":"Airport","lat":42.374262,"lng":-71.030395},{"line":"Blue","station":"Aquarium","lat":42.359784,"lng":-71.051652},{"line":"Blue","station":"Beachmont","lat":42.39754234,"lng":-70.99231944},{"line":"Blue","station":"Bowdoin","lat":42.361365,"lng":-71.062037},{"line":"Blue","station":"Government Center","lat":42.359705,"lng":-71.059215},{"line":"Blue","station":"Maverick","lat":42.36911856,"lng":-71.03952958},{"line":"Blue","station":"Orient Heights","lat":42.386867,"lng":-71.004736},{"line":"Blue","station":"Revere Beach","lat":42.40784254,"lng":-70.99253321},{"line":"Blue","station":"State Street","lat":42.358978,"lng":-71.057598},{"line":"Blue","station":"Suffolk Downs","lat":42.39050067,"lng":-70.99712259},{"line":"Blue","station":"Wonderland","lat":42.41342,"lng":-70.991648},{"line":"Blue","station":"Wood Island","lat":42.3796403,"lng":-71.02286539},{"line":"Orange","station":"Back Bay","lat":42.34735,"lng":-71.075727},{"line":"Orange","station":"Chinatown","lat":42.352547,"lng":-71.062752},{"line":"Orange","station":"Community College","lat":42.373622,"lng":-71.069533},{"line":"Orange","station":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"line":"Orange","station":"Forest Hills","lat":42.300523,"lng":-71.113686},{"line":"Orange","station":"Green Street","lat":42.310525,"lng":-71.107414},{"line":"Orange","station":"Haymarket","lat":42.363021,"lng":-71.05829},{"line":"Orange","station":"Jackson Square","lat":42.323132,"lng":-71.099592},{"line":"Orange","station":"Malden Center","lat":42.426632,"lng":-71.07411},{"line":"Orange","station":"Mass Ave","lat":42.341512,"lng":-71.083423},{"line":"Orange","station":"North Station","lat":42.365577,"lng":-71.06129},{"line":"Orange","station":"Oak Grove","lat":42.43668,"lng":-71.071097},{"line":"Orange","station":"Roxbury Crossing","lat":42.331397,"lng":-71.095451},{"line":"Orange","station":"Ruggles","lat":42.336377,"lng":-71.088961},{"line":"Orange","station":"State Street","lat":42.358978,"lng":-71.057598},{"line":"Orange","station":"Stony Brook","lat":42.317062,"lng":-71.104248},{"line":"Orange","station":"Sullivan","lat":42.383975,"lng":-71.076994},{"line":"Orange","station":"Tufts Medical","lat":42.349662,"lng":-71.063917},{"line":"Orange","station":"Wellington","lat":42.40237,"lng":-71.077082},{"line":"Red","station":"Alewife","lat":42.395428,"lng":-71.142483}, {"line":"Red","station":"Davis","lat":42.39674,"lng":-71.121815}, {"line":"Red","station":"Porter Square","lat":42.3884,"lng":-71.119149}, {"line":"Red","station":"Harvard Square","lat":42.373362,"lng":-71.118956}, {"line":"Red","station":"Central Square","lat":42.365486,"lng":-71.103802},{"line":"Red","station":"Kendall/MIT","lat":42.36249079,"lng":-71.08617653}, {"line":"Red","station":"Charles/MGH","lat":42.361166,"lng":-71.070628}, {"line":"Red","station":"Park Street","lat":42.35639457,"lng":-71.0624242}, {"line":"Red","station":"Downtown Crossing","lat":42.355518,"lng":-71.060225}, {"line":"Red","station":"South Station","lat":42.352271,"lng":-71.055242}, {"line":"Red","station":"Broadway","lat":42.342622,"lng":-71.056967}, {"line":"Red","station":"Andrew","lat":42.330154,"lng":-71.057655}, {"line":"Red","station":"JFK/UMass","lat":42.320685,"lng":-71.052391}, {"line":"Red","station":"North Quincy","lat":42.275275,"lng":-71.029583}, {"line":"Red","station":"Wollaston","lat":42.2665139,"lng":-71.0203369}, {"line":"Red","station":"Quincy Center","lat":42.251809,"lng":-71.005409}, {"line":"Red","station":"Quincy Adams","lat":42.233391,"lng":-71.007153}]' ;

	parsed=JSON.parse(string);
	numStations = Object.keys(parsed).length;
	
	for( var i=1; i<numStations; i++){
			stationLocation[i] = new google.maps.LatLng(parsed[i].lat, parsed[i].lng);
		}
	request = new XMLHttpRequest();
    request.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
    request.onreadystatechange = dataReady;
    request.send(null);
    
    getLocation();
}


function dataReady() {

        if(request.readyState ==4 && request.status == 200) {
                scheduleData =JSON.parse(request.responseText);
                line =scheduleData.line;
  				addLineMarkers();

        }
        else if (request.readyState ==2 && request.status == 500)
        {
                alert("BADDDD, 500 status");
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
  
  //addMyMarker();
  
		}




function createMarker(pos) {
    var iconImage = 'markerIcon.png';
    var marker = new google.maps.Marker({       
        position: pos, 
        map: map,
        icon: iconImage    

    });
return marker}
/*
    function createInfoWindow(station) {

    	var content = [];
		for(var i =0; i<scheduleData.schedule.length;i++){
			if(scheduleData.schedule[i].Destination == station){
				console.log(scheduleData.schedule[i].Destination);
				content = scheduleData.schedule[i].Predictions;
				console.log(content);
			
			var stationInfoWindow = new google.maps.InfoWindow({content: "<p>" + station + "</p>" + "<p>" + content + "</p>"});
			
}}
return stationInfoWindow;}
*/

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
var d = R * c; 


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
	return closestStation;

}

function addMyMarker(){
	//createMarker(myLocation);
}

function addLineMarkers() {
	var goodStationArray =[];
	var markerAndInfoWindow =[];
	var predictionsArray= new Array();

	for(var i =1; i<numStations; i++){
		if(parsed[i].line.toLowerCase() == line){
			var goodStationObect=new Object();
			goodStationObject = parsed[i];
			for(var j =0; j<scheduleData.schedule.length;j++){
				for(var z=0; z<scheduleData.schedule[j].Predictions.length; z++){
					if(scheduleData.schedule[j].Predictions[z].Stop == goodStationObject.station){
						var TrainDestination;
						var arrivalTime =0;
						arrivalTime = scheduleData.schedule[j].Predictions[z].Seconds;
						trainDestination = scheduleData.schedule[j].Destination;



						markerAndInfoWindow.push({station:goodStationObject.station, schedule:arrivalTime, direction:trainDestination});
					}
				}
			}
}}
		

console.log(markerAndInfoWindow);
}

/*
function addLineMarkers(){
	
	for( var i=1; i<numStations; i++){
		if(parsed[i].line.toLowerCase() == line){
				

				var obj = {marker: createMarker(stationLocation[i]),
				stationInfoWindow: createInfoWindow(parsed[i].station)
				};
		google.maps.event.addListener(obj.marker[i], 'click', function(){
			stationInfoWindow[i].open(map,obj.marker[i]); 
		});
}
		
		drawPolyLine(line);
}}
*/		
		

	
function drawPolyLine(line){

var trainLine = [];
for(var i=1; i<numStations; i++){
	if(parsed[i].line.toLowerCase() == line){
		trainLine.push(new google.maps.LatLng(parsed[i].lat, parsed[i].lng));
		}
		else{}
		}
var trainPoly = new google.maps.Polyline({
		path: trainLine,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	trainPoly.setMap(map);
}


	google.maps.event.addDomListener(window, 'load', getLocation);

  

    
     
     