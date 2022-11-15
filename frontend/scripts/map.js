requirejs([], function App() {
  let tableResults = document.querySelector(".table-results");
  let runRoute = document.querySelector(".runRoute");

  // let map = L.map("map").setView([44.763057, -85.620632], 2);

  // default map layer
  let map = L.map("map", {
    layers: MQ.mapLayer(),
    center: [39.828175, -98.5795],
    zoom: 4,
    zoomControl: true,
    dragging: true,
  });

  let addresses = [];

  function getAddress() {
    for (let i = 0; i < tableResults.rows.length; i++) {
      let currentAddress = tableResults.rows[i].children[2].textContent;
      addresses.push(currentAddress);
    }
  }

  function displayRoute() {
    var dir = MQ.routing.directions();

    console.log(addresses);

    dir.route({
      locations: addresses,
    });

    let CustomRouteLayer = MQ.Routing.RouteLayer.extend({
      createStartMarker: (location) => {
        var customIcon;
        var marker;

        customIcon = L.icon({
          iconUrl: "../../../assets/red.png",
          iconSize: [20, 29],
          iconAnchor: [10, 29],
          popupAnchor: [0, 29],
        });

        marker = L.marker(location.latLng, { icon: customIcon }).addTo(map);

        return marker;
      },

      createEndMarker: (location) => {
        var customIcon;
        var marker;

        customIcon = L.icon({
          iconUrl: "../../../assets/blue.png",
          iconSize: [20, 29],
          iconAnchor: [10, 29],
          popupAnchor: [0, 29],
        });

        marker = L.marker(location.latLng, { icon: customIcon }).addTo(map);

        return marker;
      },
    });

    map.addLayer(new CustomRouteLayer({ directions: dir, fitBounds: true }));
  }

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // L.marker([44.763057, -85.620632])
  //   .addTo(map)
  //   // .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
  //   .openPopup();

  let markerOptions = {
    title: "MyLocation",
    clickable: true,
    draggable: true,
  };

  runRoute.onclick = function (e) {
    e.preventDefault();
    getAddress();
    addresses.shift();
    console.log(addresses);
    displayRoute();

    // for (let i = 0; i < tableResults.rows.length; i++) {
    //   let curr_add = tableResults.rows[i].children[2].textContent;
    //   $.get(
    //     "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
    //       curr_add,
    //     function (data) {
    //       for (let i = 0; i < data.length; i++) {
    //         var marker = L.marker([data[0].lat, data[0].lon], markerOptions);
    //         marker.addTo(map);
    //       }
    //     }
    //   );

    //   // curr_item.addTo(map)
    // }
  };
})();
