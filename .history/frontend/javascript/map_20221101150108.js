

let submitBtn = document.querySelector('.submitBtn')

let map = L.map("map").setView([44.763057, -85.620632], 10);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([44.763057, -85.620632])
  .addTo(map)
  // .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
  .openPopup();

//   var mapOptions = {
//     center: [17.385044, 78.486671],
//     zoom: 10
// }
// var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
// var map = new L.map('mapid', mapOptions);
// map.addLayer(layer);

// var markerOptions = {
//     title: "MyLocation",
//     clickable: true,
//     draggable: true
// }

// function onClick(e) {
//     alert(this.getLatLng());
// }
// var marker = L.marker([44.763057, -85.620632], markerOptions).addEventListener('click', onClick);
// marker.addTo(map);

// marker.addTo(map);
let inputText ="4.5709, -74.2793";
let location = {
  latitude:"38.96384532",
  longitude:"-76.95262225",
  human_address:"{\"address\": \"6200 BELCREST RD\", \"city\": \"Hyattsville\", \"state\": \"MD\", \"zip\": \"\"}"
}

submitBtn.onclick = function(e){
  e.preventDefault()
  console.log('clicked');
  
  // let addresses = localStorage.getItem('addresses')
  L.marker(inputText.split(',')).addTo(map);
  // var mp = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  // alert(mp.getLatLng());
};





