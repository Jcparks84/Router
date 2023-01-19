import { pubSub } from "./pubSub.js";
import {l} from "leaflet"

console.log("Maps Wired");

function Map(){
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

  let addresses:any = [];

  pubSub.subscribe("selectedRoute", (selectedRoute: any) => {
    getAddresses(selectedRoute);
  });

  function getAddresses(selectedRoute: any) {
    let route = selectedRoute.customers;
    for (let i = 0; i < route.length; i++) {
      addresses.push(route[i].address);
    }

    console.log(addresses)
  }

  
}

Map()

