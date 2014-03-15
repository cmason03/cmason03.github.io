var numStations = 0;
var parsed = [];
var map;
var stationLocation= [];
var myLocation;
var distancesAndStation=[];
var scheduleData = [];
var line;
var markerAndInfoWindow =[];
var windowContent= [];
var markerArray =[];
var stationMarker = new Object();





function parse() {

	//redline are the only stations in order (for the sake of time), delete the 4 stations that branch off
	string = '[{"line":"Red","station":"Alewife","lat":42.395428,"lng":-71.142483}, {"line":"Red","station":"Davis","lat":42.39674,"lng":-71.121815}, {"line":"Red","station":"Porter Square","lat":42.3884,"lng":-71.119149}, {"line":"Red","station":"Harvard Square","lat":42.373362,"lng":-71.118956}, {"line":"Red","station":"Central Square","lat":42.365486,"lng":-71.103802},{"line":"Red","station":"Kendall/MIT","lat":42.36249079,"lng":-71.08617653}, {"line":"Red","station":"Charles/MGH","lat":42.361166,"lng":-71.070628}, {"line":"Red","station":"Park Street","lat":42.35639457,"lng":-71.0624242}, {"line":"Red","station":"Downtown Crossing","lat":42.355518,"lng":-71.060225}, {"line":"Red","station":"South Station","lat":42.352271,"lng":-71.055242}, {"line":"Red","station":"Broadway","lat":42.342622,"lng":-71.056967}, {"line":"Red","station":"Andrew","lat":42.330154,"lng":-71.057655}, {"line":"Red","station":"JFK/UMass","lat":42.320685,"lng":-71.052391}, {"line":"Red","station":"North Quincy","lat":42.275275,"lng":-71.029583}, {"line":"Red","station":"Wollaston","lat":42.2665139,"lng":-71.0203369}, {"line":"Red","station":"Quincy Center","lat":42.251809,"lng":-71.005409}, {"line":"Red","station":"Quincy Adams","lat":42.233391,"lng":-71.007153}]' ;

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
    zoom: 12
  };
       
  map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
  addLineMarkers();
  addMyMarker();
  
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
			closestStationLocation= stationLocation[i];
		}
	}
	return [closestStation, closestStationLocation];
	
}

function addMyMarker(){
	var closestToMe = closestStation();
	var contentString = "You are " + getDistance(myLocation, closestToMe[1]) + " km from " + closestToMe[0];

	var infowindow = new google.maps.InfoWindow({
      content: contentString
  });
	var marker = new google.maps.Marker({
      position: myLocation,
      map: map,
      title: 'You are here'
  });
  google.maps.event.addListener(window, 'load', function() {
    infowindow.open(map,marker);
  });}


function addMarker(windowInfo, pos){
	
	console.log(windowInfo);
	var stationMarker;
	stationMarker = new google.maps.Marker({
    position: pos,
    title:"Hello World!",
    map: map
});
	


	
	stationMarker.setMap(map);
	
	var content = "<p>" + "Here is a station!" + "</p>";
	for (var i =0; i< windowInfo.length;i++){

		content+= "<p> Destination: " + windowInfo[i][1] + " Seconds: " + windowInfo[i][2] + "</p>";

	}
	var infowindow = new google.maps.InfoWindow({content:content});
	google.maps.event.addListener(stationMarker, "click",function(){infowindow.open(map,stationMarker);});
	return stationMarker;
	
	
}



function addLineMarkers() {

	var goodStationArray =[];
	var newPoint;
	
	var predictionsArray= new Array();

	for(var i =1; i<numStations; i++){
		if(parsed[i].line.toLowerCase() == line){
			var goodStationObject= new Object();
			goodStationObject = parsed[i];
			for(var j =0; j<scheduleData.schedule.length;j++){
				for(var z=0; z<scheduleData.schedule[j].Predictions.length; z++){
					if(scheduleData.schedule[j].Predictions[z].Stop == goodStationObject.station){
						var TrainDestination;
						var arrivalTime =0;
						arrivalTime = scheduleData.schedule[j].Predictions[z].Seconds;
						trainDestination = scheduleData.schedule[j].Destination;



						markerAndInfoWindow.push({station:goodStationObject.station, schedule:arrivalTime, direction:trainDestination});
					}}}}}


	
	
	for(var i=0; i<numStations;i++){
		if(parsed[i].line.toLowerCase() == line){
		var windowContent=[];
			for(var j =0; j<markerAndInfoWindow.length;j++){
				
				if(markerAndInfoWindow[j].station == parsed[i].station){
					var position = stationLocation[i];
					windowContent.push([parsed[i].station, markerAndInfoWindow[j].direction, markerAndInfoWindow[j].schedule]);
				}
	}

addMarker(windowContent,position);
drawPolyLine(line);

			}

		}


	}
				


	
		

	
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

  

    
     
     