import { json } from "stream/consumers";
import { pubSub } from "./pubSub.js";
declare var ko: KnockoutStatic

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
    let routeHtml: any = document.querySelector(".routeTime-span");
    let driveHtml: any = document.querySelector(".driveTime-span");
    let deliveryHtml: any = document.querySelector(".deliveryTime-span");
    routeHtml.innerHTML = secondsTimeConversion(totalTime)
    driveHtml.innerHTML = secondsTimeConversion(driveTime)
    deliveryHtml.innerHTML = secondsTimeConversion(deliveryTime)

    
  }

  function secondsTimeConversion(seconds: number){
    let h = Math.floor(seconds / 60 / 60);
    let m = Math.floor(seconds / 60) - h * 60;
    let s = seconds % 60;

    return `${h}:${m}:${s}`

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

