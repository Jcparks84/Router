import { json } from "stream/consumers";
import { pubSub } from "./pubSub.js";

console.log("Map Wired");

declare var L: any;
let runRoute = document.querySelector(".runRoute") as any;

L.mapquest.key = "ck2OXUAJsF0iz999XGQ62jyXo8AXOVp7";

var map = L.mapquest.map("map", {
  center: [40.7128, -74.0059],
  layers: L.mapquest.tileLayer("map"),
  zoom: 13,
});

window.onload = function () {
  // L.mapquest.key = "ck2OXUAJsF0iz999XGQ62jyXo8AXOVp7";

  let addresses: any = [];
  let selecetedRoute: any = [];
  let routeTime: any = [];
  let startAddress: any = "";
  let endAddress: any = "";
  let cases: number = 0;

  pubSub.subscribe("selectedRoute", (selectedRoute: any) => {
    getAddresses(selectedRoute);
  });

  pubSub.subscribe("totalCases", (totalCases: any) => {
    cases = totalCases;
  });

  function getAddresses(selectedRoute: any) {
    let route = selectedRoute.customers;
    for (let i = 0; i < route.length; i++) {
      addresses.push(route[i].address);
      selecetedRoute.push(route[i].address);
    }
  }

  function displayRoute() {
    startAddress = addresses[0];
    endAddress = addresses[addresses.length - 1];
    addresses.shift();
    addresses.pop();
    for (let i = 0; i < addresses.length; i++) {
      var directions = L.mapquest.directions();
      directions.route({
        start: startAddress,
        end: endAddress,
        waypoints: addresses,
      });
    }
  }

  function getTotalTime(error: any, response: any) {
    routeTime = response.time;
    let driveTime = routeTime[0].reduce(function (a: number, b: number) {
      return a + b;
    }, 0);
    let totalCarts = cases / 8;
    let deliveryTime = totalCarts * 180;
    let totalTime = deliveryTime + driveTime;
    var hours = Math.floor(totalTime / 60 / 60);
    var minutes = Math.floor(totalTime / 60) - hours * 60;
    var seconds = totalTime % 60;
    let html: any = document.querySelector(".routeTime-span");
    if (html != undefined) {
      html.innerHTML = `${hours}: ${minutes}: ${seconds}`
    }
  }

  function getRouteResponse() {
    var directions = L.mapquest.directions();
    directions.routeMatrix(
      {
        locations: selecetedRoute,
        options: {
          allToAll: true,
        },
      },
      getTotalTime
    );
  }

  runRoute!.onclick = function (e: any) {
    console.log("click");
    displayRoute();
    getRouteResponse();
  };
};

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
// window.onload = function() {
//   L.mapquest.key = 'ck2OXUAJsF0iz999XGQ62jyXo8AXOVp7';

//   let tableResults = document.querySelector(".table-results");
// let runRoute = document.querySelector(".runRoute") as any;

//   // default map layer

//   let mapOptions = {
//     elt: document.getElementById("map"),
//     zoomControl: true,
//     draggable: true,
//     zoomOnDoubleClick: true,
//   };

//   let map = L.mapquest.map("map", {
//     layers: L.mapquest.tileLayer('map'),
//     center: [39.828175, -98.5795],
//     zoom: 4,
//     zoomControl: true,
//   });

//   let addresses: any = [];

//   pubSub.subscribe("selectedRoute", (selectedRoute:any) => {
//     getAddresses(selectedRoute);
//   });

//   function getAddresses(selectedRoute:any) {
//     let route = selectedRoute.customers;
//     for (let i = 0; i < route.length; i++) {
//       addresses.push(route[i].address);
//     }
//   }

//   function displayRoute() {
//     //Get and Display Directions
//     let dir = L.mapquest.Directions().on("success", function (data:any) {
//       let legs = data.route.legs,
//         html = "",
//         maneuvers,
//         i;

//       if (legs && legs.length) {
//         maneuvers = legs[0].maneuvers;

//         for (i = 0; i < maneuvers.length; i++) {
//           html += i + 1 + ". ";
//           html += maneuvers[i].narrative + "";
//         }

//         L.DomUtil.get("route-narrative")!.innerHTML = html;
//       }
//       let x = document.getElementById("route-narrative");
//       if (x!.style.display === "none") {
//         x!.style.display = "block";
//       } else {
//         x!.style.display = "none";
//       }
//     });

//     let estTime = L.mapquest.Routing.directions().on("success", function (data:any) {
//       let legs = data.route.legs;
//       console.log(data);
//       let html = document.querySelector(".routeTime-span");
//       let cases = Number(document.querySelector(".cases-span")!.textContent);

//       console.log(cases);

//       let driveTime = 0;

//       for (let i = 0; i < legs.length; i++) {
//         driveTime += legs[i].time;
//       }

//       let totalCarts = cases / 8;
//       let deliveryTime = totalCarts * 180;

//       let totalTime = new Date(driveTime + deliveryTime * 1000)
//         .toISOString()
//         .slice(11, 19);

//       html!.innerHTML = totalTime;
//     });

//     dir.route({
//       locations: addresses,
//     });

//     estTime.route({
//       locations: addresses,
//     });

//     // dir.optimizedRoute({
//     //   locations: addresses,
//     // });

//     let CustomRouteLayer = L.mapquest.Routing.RouteLayer.extend({
//       createStartMarker: (location:any) => {
//         let customIcon;
//         let marker;

//         customIcon = L.icon({
//           iconUrl: "../../../assets/red.png",
//           iconSize: [20, 29],
//           iconAnchor: [10, 29],
//           popupAnchor: [0, 29],
//         });

//         marker = L.marker(location.latLng, { icon: customIcon }).addTo(map);

//         return marker;
//       },

//       createEndMarker: (location:any) => {
//         let customIcon;
//         let marker;

//         customIcon = L.icon({
//           iconUrl: "../../../assets/blue.png",
//           iconSize: [20, 29],
//           iconAnchor: [10, 29],
//           popupAnchor: [0, 29],
//         });

//         marker = L.marker(location.latLng, { icon: customIcon }).addTo(map);
//         return marker;
//       },
//     });

//     // MQ.trafficLayer().addTo(map);

//     map.addLayer(
//       new CustomRouteLayer({
//         directions: dir,
//         fitBounds: true,
//         zoomControl: true,
//       })
//     );
//   }

//   let markerOptions = {
//     title: "MyLocation",
//     clickable: true,
//     draggable: true,
//   };

//   runRoute!.onclick = function (e: any) {
//     console.log("click");

//     e.preventDefault();
//     displayRoute();
//   };
// };
