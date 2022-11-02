
let tableResults = document.querySelector(".table-results");
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


// marker.addTo(map);


  
// function setMarkers(data) 
  for (let i = 0; i < tableResults.rows.length; i++) {
      let curr_add = tableResults.rows[i].children[2].textContent
      $.get("https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + curr_add, function(data){
        console.log(data);
    for(let i =0; i < data.length; i++){
      console.log(data[0].lat, data[0].lon)
      var marker2 = L.marker([data[0].lat, data[0].lon], markerOptions)
       marker2.addTo(map);
    }

      });
      console.log(curr_add)
      

     
      // curr_item.addTo(map)
        
  }
}


  // var mp = new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  // alert(mp.getLatLng());






