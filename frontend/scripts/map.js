requirejs(["./pubsub", "./form", "./route"], function App() {
  let tableResults = document.querySelector(".table-results");
  let runRoute = document.querySelector(".runRoute");

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

  pubSub.subscribe("selectedRoute", (selectedRoute) => {
    getAddresses(selectedRoute);
  });

  function getAddresses(selectedRoute) {
    let route = selectedRoute.customers;
    for (let i = 0; i < route.length; i++) {
      addresses.push(route[i].address);
    }
  }

  function displayRoute(selectedRoute) {
    //Get and Display Directions
    let dir = MQ.routing.directions().on("success", function (data) {
      let legs = data.route.legs,
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

    let estTime = MQ.routing.directions().on("success", function (data) {
      let legs = data.route.legs;
      console.log(data);
      let html = document.querySelector(".routeTime-span");
      let cases = Number(document.querySelector(".cases-span").textContent);

      console.log(cases);

      let driveTime = 0;

      for (let i = 0; i < legs.length; i++) {
        driveTime += legs[i].time;
      }

      let totalCarts = cases / 8;
      let deliveryTime = totalCarts * 180;

      let totalTime = new Date(driveTime + deliveryTime * 1000)
        .toISOString()
        .slice(11, 19);

      html.innerHTML = totalTime;
    });

    dir.route({
      locations: addresses,
    });

    estTime.route({
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
    displayRoute();
  };
})();
