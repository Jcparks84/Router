// pubSub.subscribe("selectedRoute", (r: any) => {});

// var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution: "© OpenStreetMap",
// });

// function Map() {
//   let mapOptions = {
//     elt: document.getElementById("map"),
//     zoomControl: true,
//     draggable: true,
//     zoomOnDoubleClick: true,
//   };

//   let map = L.map("map", {
//     layers: [osm],
//     center: [39.828175, -98.5795],
//     zoom: 4,
//     zoomControl: true,
//   });
  
//   const coordinance: any = []


//   L.Routing.control({
//     waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
//   }).addTo(map);
//   let addresses: any = [];


//   pubSub.subscribe("selectedRoute", (selectedRoute: any) => {
//     getAddresses(selectedRoute);
//   });


//   function getLatLng(street: string, city: string, state: string, zip: string) {
//     fetch(
//       `https://api.opencagedata.com/geocode/v1/json?key=49c509a5d28941e992269e2c1efa57e4&q=${street}+${city}+${state}+${zip}`
//     )
//       .then((res) => res.json())
//       .then((data) => lat.push(data))
//   }

//   function getAddresses(selectedRoute: any) {
//     let route = selectedRoute.customers;
//     for (let i = 0; i < route.length; i++) {
//       addresses.push(route[i].address);
//       addresses.forEach(
//         (e: { street: string; city: string; state: string; zip: string }) =>
//           getLatLng(e.street, e.city, e.state, e.zip)
//       );
//       console.log(coordinance);
      
//     }
//   }
// }

// Map();
