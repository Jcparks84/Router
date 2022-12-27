import { observable } from "knockout";
import { CustomerProps, LocationProps } from "./interface";
import { pubSub } from "./pubSub.js";
declare var ko: KnockoutStatic;

export function Form() {
  // const self = this

  // self.routeName = ko.observable("bob")

  let newCustomer = [];
  let addresses = [];

  let createRouteBtn = document.querySelector(".create-route-button")!;
  createRouteBtn.addEventListener("click", () => {
    displayRouteName();
    clearRouteForm();
    clearTable();
  });

  function clearTable() {
    $("#tbody").empty();
  }

  // Displays Created Route in HTML
  let routeHTML = document.querySelector(".route-span") as HTMLInputElement;
  let routeName = document.querySelector(".route-name") as HTMLInputElement;

  function displayRouteName() {
    let r = routeName.value;
    routeHTML.innerHTML = r;
    createNewRoute(r);
  }

  function clearRouteForm() {
    routeName.value = "";
  }

  ///////// Add Customers to Route ///////

  let customerName = document.querySelector(".c-name") as HTMLInputElement;
  let street = document.querySelector(".input-street") as HTMLInputElement;
  let city = document.querySelector(".input-city") as HTMLInputElement;
  let state = document.querySelector(".input-state") as HTMLInputElement;
  let zip = document.querySelector(".input-zip") as HTMLInputElement;
  let phone = document.querySelector(".c-phone") as HTMLInputElement;
  let key = document.querySelector(".key") as HTMLInputElement;
  let quantity = document.querySelector(".quantity") as HTMLInputElement;
  let stopNotes = document.querySelector(".stop-notes") as HTMLInputElement;

  let addStopBtn = document.querySelector(".add-stop-button")!;
  addStopBtn.addEventListener("click", (e) => {
    addCustomer();
    clearCustomerForm();
  });

  //Create customer object

  function addCustomer() {
    let customerInfo = {
      name: customerName.value,
      address: {
        street: street.value,
        city: city.value,
        state: state.value,
        zip: zip.value,
      },
      phone: phone.value,
      key: key.value,
      cases: quantity.value,
      driverNotes: stopNotes.value,
    };
    newCustomer.push(customerInfo);
    addresses.push({
      street: customerInfo.address.street,
      city: customerInfo.address.city,
      state: customerInfo.address.state,
      zip: customerInfo.address.zip,
    });
    // routes[0].customers.push(customerInfo);
    pubSub.publish("addedCustomer", customerInfo);
    addFormCustomerToTable(customerInfo);
    getTotalCases(customerInfo);
  }

  // Create Route Object
  function createNewRoute(r: string) {
    // let obj = { name: r, customers: [] };
    // routes.push(obj);
    pubSub.publish("route", r);
  }

  let tableResults = document.querySelector(
    ".table-results"
  ) as HTMLTableElement;

  function addFormCustomerToTable(customerInfo: CustomerProps) {
    let tr = document.createElement("tr");
    let tbody = document.querySelector(".tbody")!;
    tr.innerHTML = `
                         <td>${tableResults.rows.length}</td>
                         <td>${customerInfo.name}</td>
                         <td>${customerInfo.address!.street} ${
      customerInfo.address!.city
    } ${customerInfo.address!.state} ${customerInfo.address!.zip}
                         <td>${customerInfo.phone}</td>
                         <td>${customerInfo.key}</td>
                         <td>${customerInfo.cases}</td>
                         `;

    tbody.appendChild(tr);
  }

  function getTotalCases(customerInfo: CustomerProps) {
    let html = document.querySelector(".cases-span")!;
    let cases = JSON.parse(customerInfo.cases!);
    if (html.textContent === "") {
      html.innerHTML = cases;
    } else html.innerHTML = cases + JSON.parse(html.textContent as string);
  }

  function clearCustomerForm() {
    customerName.value = "";
    street.value = "";
    city.value = "";
    state.value = "";
    zip.value = "";
    phone.value = "";
    key.value = "No";
    quantity.value = "0";
    stopNotes.value = "";
  }

  //////////////////////////////////// Type ahead ////////////////////////////////////////

  //Import locations
  fetch("/frontend/src/libraries/locations.json")
    .then((res) => res.json())
    .then((data) => locations.push(...data));

  let locations: LocationProps[] = [];
  let sortedLocations = locations.sort();

  // Typeahead City

  city.addEventListener("keyup", (e) => {
    let cities = sortedLocations.map(({ city }) => {
      return city;
    });
    removeElements();
    for (let i of cities) {
      if (
        i.toLocaleLowerCase().startsWith(city.value.toLocaleLowerCase()) &&
        city.value != ""
      ) {
        let listItem = document.createElement("li");
        listItem.classList.add("list-items");
        listItem.onclick = () => {
          displayCityNames(i);
          removeElements();
        };
        let word = "<b>" + i.substr(0, city.value.length) + "</b>";
        word += i.substr(city.value.length);
        listItem.innerHTML = word;
        document.querySelector(".suggestions-city")!.appendChild(listItem);
      }
    }
  });

  // Typeahead State

  state.addEventListener("keyup", (e) => {
    let statesMultiples = sortedLocations.map(({ state }) => {
      return state;
    });
    removeElements();
    let states = [...new Set(statesMultiples)];
    for (let i of states) {
      if (
        i.toLocaleLowerCase().startsWith(state.value.toLocaleLowerCase()) &&
        state.value != ""
      ) {
        let listItem = document.createElement("li");
        listItem.classList.add("list-items");
        listItem.onclick = () => {
          displayStateNames(i);
          removeElements();
        };
        let word = "<b>" + i.substr(0, state.value.length) + "</b>";
        word += i.substr(state.value.length);
        listItem.innerHTML = word;
        document.querySelector(".suggestions-state")!.appendChild(listItem);
      }
    }
  });

  
  function displayCityNames(value: string) {
    city.value = value;
  }

  function displayStateNames(value: string) {
    state.value = value;
  }
  function removeElements() {
    let item = document.querySelectorAll(".list-items");
    item.forEach((item) => {
      item.remove();
    });
  }
}

const form = Form();

var myViewModel = {
  personName: 'Bob',
  personAge: 123,
  routeName: "123"
};

console.log("hello");
// const knockoutApp = document.querySelector(".container");
ko.applyBindings(myViewModel);


