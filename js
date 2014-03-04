function InstaBombPhoto (headline){
	
}
$(document).ready(function(){

console.log("LOADED!!!!");

//Use jQuery to assign a callback function when the 'search' button is clicked
$("#enter").click(function(){
console.log("Clicked enter");
//Use jQuery to get the value of the 'query' input box
var newSearchTerm = $("#inputText").val();
console.log(newSearchTerm);
geo(newSearchTerm);

});

});

var mppd;
function geo(cities){
var mapd = {};
var googleGeoLoc = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var address = cities;
//var address = whatCountry;
var sensor = '&sensor=false';


$.ajax({
url:googleGeoLoc+address+sensor,
type:'GET',
dataType: 'json',
async:false,
error: function(){
console.log("LatLng wrong");
},
success: function(data){
console.log(data);
//return data.results[0].geometry.location;
mapd = data.results[0].geometry.location;
mppd = mapd;
console.log("mapd - "+mapd);
getInstagramData(mapd);
}

});

}
var instamap={};
function getInstagramData(mapd){
  var instaLat = mapd.latitude;
  var instaLong = mapd.longitude;
  var str = "lat="+instaLat+"&"+"lng="+instaLong;
	var instagramURL = 'https://api.instagram.com/v1/tags/photobomb/media/recent?';
	var instagramKey = '&client_id=af9f477d684c402e94c6a05dbb612846';

$.ajax({
 url: instagramURL+str+instagramKey,
 type: 'GET',
 dataType: 'jsonp',
 async:false,
 error: function(data){
  console.log("We got problems");
  console.log(data.status);
 },
 success: function(data){
  console.log("WooHoo!");
  console.log(data);
  instamap=data;
  drmark();
  var photos = data["data"];
  for (var i in photos){
  var photo = photos[i];
  if (instamap.data[i].location !==null){
//initialize(instamap.data[i].location.latitude, instamap.data[i].location.longitude);
//console.log(instamap.data[i].location.latitude, instamap.data[i].location.longitude);
  lomarkers.push(instamap.data[i].location);
  immark.push(instamap.data[i].images.thumbnail.url);
  //console.log(lomarkers);
  }
  console.log(immark);
 dispmark();

}

 }
}
);
}
//window.onload= getInstagramData();
var immark=[];
var lomarkers=[];
function initialize(latitude, longitude) {

}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&';
  document.body.appendChild(script);
}
function drmark(){
	var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(mppd.lat, mppd.lng)
  };

  moop=mapOptions;
  // var map = new google.maps.Map(document.getElementById('map-canvas'),
  //     mapOptions);
}
var moop={};
//window.onload = loadScript;

function dispmark(){
	var map = new google.maps.Map(document.getElementById('map-canvas'),moop);
	for (var i=0; i<lomarkers.length; i++){
	var marker = new google.maps.Marker({
	position:new google.maps.LatLng(lomarkers[i].latitude, lomarkers[i].longitude),
	map:map,
	title: "Hello world",
	icon: immark[i]
}
);
	}
}




