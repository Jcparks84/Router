requirejs([], function App() {
  let tableResults = document.querySelector(".table-results");
  let runRoute = document.querySelector(".runRoute");

  // let map = L.map("map").setView([44.763057, -85.620632], 2);

  // default map layer

  let mapOptions = {
    elt: document.getElementById("map"),
    zoomControl: true,
    draggable: true,
    zoomOnDoubleClick: true,
  };

  let map = L.map("map", {
    layers: MQ.mapLayer(mapOptions),
    center: [39.828175, -98.5795],
    zoom: 4,
    zoomControl: true,
  });

  let addresses = [];

  function getAddress() {
    for (let i = 0; i < tableResults.rows.length; i++) {
      let currentAddress = tableResults.rows[i].children[2].textContent;
      addresses.push(currentAddress);
    }
  }

  function displayRoute() {
    //Get and Display Directions

    let dir = MQ.routing.directions().on("success", function (data) {
      var legs = data.route.legs,
        html = "",
        maneuvers,
        i;

      if (legs && legs.length) {
        maneuvers = legs[0].maneuvers;

        for (i = 0; i < maneuvers.length; i++) {
          html += i + 1 + ". ";
          html += maneuvers[i].narrative + "";
        }

        L.DomUtil.get("route-narrative").innerHTML = html;
      }
      let x = document.getElementById("route-narrative");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    });

    //////////////////////////////////////////////////

    //Get Est Route Time

    let _data = {
      body: JSON.stringify(addresses),
    };

    function loopAdd() {
      for (let i = 0; i < addresses.length; i++) {
        return addresses[i];
      }
    }

    // setTimeout(
    //   fetch(
    //     "http://www.mapquestapi.com/directions/v2/routematrix?key=ejLFSB4eBrlRP7Lwl1pIZZm9O1AoOeTl",
    //     {
    //       method: "POST",
    //       body: JSON.stringify(_data),
    //       headers: { "Content-type": "application/json; charset=UTF-8" },
    //     },
    //     1000
    //   )
    //     .then((response) => response.json())
    //     .then((json) => console.log(json))
    // );

    // let promise = fetch(
    //   "http://www.mapquestapi.com/directions/v2/routematrix?key=ejLFSB4eBrlRP7Lwl1pIZZm9O1AoOeTl",
    //   []
    // );

    // async function getEstRouteTime() {
    //   let url =
    //     "http://www.mapquestapi.com/directions/v2/routematrix?key=ejLFSB4eBrlRP7Lwl1pIZZm9O1AoOeTl";

    //   let data = addresses;

    //   for (let i = 0; i < data.length; i++) {
    //     return data[i];
    //   }

    //   console.log(data);

    //   let res = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //     manyToOne: true,
    //   });

    //   if (res.ok) {
    //     // let text = await res.text();
    //     // console.log(text);
    //     // return text;

    //     let ret = await res.json();
    //     console.log("!!!-RET-!!!", ret);
    //     return JSON.parse(ret.data);
    //   } else {
    //     return `HTTP error: ${res.status}`;
    //   }
    // }

    // getEstRouteTime().then((data) => {
    //   console.log(data);
    // });

    /////////////////////////////////////////////////////

    dir.route({
      locations: addresses,
    });

    // dir.optimizedRoute({
    //   locations: addresses,
    // });

    let CustomRouteLayer = MQ.Routing.RouteLayer.extend({
      createStartMarker: (location) => {
        let customIcon;
        let marker;

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
        let customIcon;
        let marker;

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

    MQ.trafficLayer().addTo(map);

    map.addLayer(
      new CustomRouteLayer({
        directions: dir,
        fitBounds: true,
        zoomControl: true,
      })
    );
  }

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  let markerOptions = {
    title: "MyLocation",
    clickable: true,
    draggable: true,
  };

  runRoute.onclick = function (e) {
    e.preventDefault();
    getAddress();
    addresses.shift();
    displayRoute();
    // GetEstRouteTime();
  };
})();
