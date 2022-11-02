

let submitBtn = document.querySelector('.submitBtn')

let map = L.map("map").setView([44.763057, -85.620632], 2);
// let inputText ="4.5709, -74.2793";

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([44.763057, -85.620632])
  .addTo(map)
  // .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
  .openPopup();


var markerOptions = {
    title: "MyLocation",
    clickable: true,
    draggable: true
}

function onClick(e) {
    alert(this.getLatLng());
}

submitBtn.onclick = function(e){
  e.preventDefault()
  console.log('clicked');
   let addresses = JSON.parse(localStorage.getItem('addresses'));
   let routes = JSON.parse(localStorage.getItem('routes'))
   console.log('addresses', addresses);
   console.log(routes)
let location = {
  lat:"38.96384532",
  long:"-76.95262225",
  human_address:"{\"address\": \"6200 BELCREST RD\", \"city\": \"Hyattsville\", \"state\": \"MD\", \"zip\": \"\"}"
}

var marker = L.marker([location.lat, location.long], markerOptions)
marker.addTo(map);

// marker.addTo(map);


  
// function setMarkers(data) {
  for (let i = 0; i < routes.address.length; i++) {
      let curr_add = routes.address[i]
      let street = curr_add.properties["street"]
      let city = curr_add.properties["city"]
      let state = curr_add.properties["state"]
      let zip = curr_add.geometry.coordinates[2];

      // let curr_color = colorMap[colorCutoffDepths.reduce((a, b, i) => b<quake_depth ? i+1 : a, 0)]

      // let markerIcon = L.divIcon({
      //     html: `<svg width="${mag_scale * 10}" height="${mag_scale * 10}">
      //                         <circle cx="${mag_scale * 5}" cy="${mag_scale * 5}" r="${mag_scale * 4}" stroke="black" stroke-width="1" fill=${"#"+curr_color} />
      //                         </svg>`,
      //     iconAnchor: L.point([mag_scale * 5, mag_scale * 5]), 
      //     className: "circleIcon"
      // });

      let curr_item = L.marker([curr_add.geometry.coordinates[1], curr_quake.geometry.coordinates[0]])
      curr_item.bindPopup("M: " + mag_scale +"<br>" + 
                          "Depth: " + quake_depth + "<br>" +
                          "Location: " + quake_location + "<br>" +
                          "Time: " + quake_time.toString());

      curr_item.addTo(map)
      //cleans data by removing invalid magnitudes (negative magnitudes are meaningless)
      // if(mag_scale >= 0) {
      //     overlays[0]["Markers"].addLayer(curr_item)
      // }   
  }
}
 
  // var mp = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  // alert(mp.getLatLng());
};





