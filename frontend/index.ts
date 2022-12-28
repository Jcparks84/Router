import { pubSub } from "./src/libraries/pubsub.js";
import { Route } from "./src/routes.js";
import {
  CustomerProps,
  RouteProps,
  AddressProps,
  LocationProps,
} from "./src/interface.js";
import validation from "knockout.validation";

declare var ko: KnockoutStatic;

export class RouteViewModel {
  routeName = ko.observable("");
  casesCount = ko.observable(0); // total cases of customers
  customerName = ko.observable("");
  customerStreet = ko.observable("");
  customerCity = ko.observable("");
  customerState = ko.observable("");
  customerZip = ko.observable("");
  customerPhone = ko.observable("");

  keystopOptions = ko.observableArray(["Yes", "No"])
  keystop = ko.observable("no");

  customerCases = ko.observable(0);
  stopNotes = ko.observable("");
  addresses: AddressProps[] = [];
  customers: CustomerProps[] = [];
  routes: RouteProps[] = [];
  matchingLocations: LocationProps[] = [];
  sortedLocations: LocationProps[] = [];


//   customerAddress = ko.observableArray([
//     this.customerStreet,
//     this.customerCity,
//     this.customerState,
//     this.customerZip
//   ])
  
//   customers = ko.observableArray([{
//     name: this.customerName(""),
//     address: {
//         street: this.customerStreet(""),
//         city: this.customerCity(""),
//         state: this.customerState(""),
//         zip: this.customerZip(""),
//     },
//     phone: this.customerPhone(""),
//     key: this.keystop(""),
//     cases: this.customerCases(0),
//     driverNotes: this.stopNotes("")
//   }
//   ])

  constructor() {}

  onRouteButtonClick() {
    const route = {
      name: this.routeName(),
    };
    pubSub.publish("route", route);
    this.routeName("")
  }

  onCustomerButtonClick() {
    console.log("clicked");
    this.addCustomer();
  }



  addCustomer() {
    let newCustomer = {
      name: this.customerName(),
      address: {
        street: this.customerStreet(),
        city: this.customerCity(),
        state: this.customerState(),
        zip: this.customerZip(),
      },
      phone: this.customerPhone(),
      key: this.keystop(),
      cases: this.customerCases(),
      driverNotes: this.stopNotes(),
    };
    this.customers.push(newCustomer);
    this.addresses.push({
      street: this.customerStreet(),
      city: this.customerCity(),
      state: this.customerState(),
      zip: this.customerZip(),
    });
    pubSub.publish("addedCustomer", newCustomer);
    this.updateTotalCases(newCustomer);
  }


//   addFormCustomerToTable(newCustomer: CustomerProps) {
//     let tableResults = document.querySelector(
//       ".table-results"
//     ) as HTMLTableElement;
//     // const tableResults = ko.observable("")
//     let tr = document.createElement("tr");
//     let tbody = document.querySelector(".tbody");

//     tr.innerHTML = `
//     <td>${tableResults.rows.length}</td>
//     <td>${newCustomer.name}</td>
//     <td>${newCustomer.address!.street} ${newCustomer.address!.city} ${
//       newCustomer.address!.state
//     } ${newCustomer.address!.zip}
//     <td>${newCustomer.phone}</td>
//     <td>${newCustomer.key}</td>
//     <td>${newCustomer.cases}</td>
//     `;
//     if (!tbody) {
//       throw new Error("this element was not defined");
//     }
//     tbody.appendChild(tr);
//   }

  updateTotalCases(newCustomer: CustomerProps) {
    let cases = Number(newCustomer.cases);
    this.casesCount(this.casesCount() + cases);
  }

  getMatchingLocations() {
    fetch("/frontend/src/libraries/locations.json")
      .then((res) => res.json())
      .then((data) => this.matchingLocations.push(...data));
  }

  // to-do data-bind event listener?
  matchingCities(e: Event) {
    // console.log(e);

    this.getMatchingLocations();
    let cities = this.sortedLocations.map(({ city }) => {
      return city;
    });

    // to-do ko customercity not being read?
    let customerCity = this.customerCity();
    // console.log(customerCity);

    this.removeElements();
    for (let i of cities) {
      if (
        i
          .toLocaleLowerCase()
          .startsWith(this.customerCity().toLocaleLowerCase()) &&
        this.customerCity() != ""
      ) {
        let listItem = document.createElement("li");
        listItem.classList.add("list-items");
        listItem.onclick = () => {
          this.displayCityNames(i);
          this.removeElements();
        };
        let word = "<b>" + i.substr(0, this.customerCity().length) + "</b>";
        word += i.substr(this.customerCity().length);
        listItem.innerHTML = word;
        document.querySelector(".suggestions-city")!.appendChild(listItem);
      }
    }
  }

  // to-do data-bind event listener?
  matchingStates() {
    this.getMatchingLocations();
    let statesMultiples = this.sortedLocations.map(({ state }) => {
      return state;
    });
    this.removeElements();
    let states = [...new Set(statesMultiples)];
    for (let i of states) {
      if (
        i
          .toLocaleLowerCase()
          .startsWith(this.customerState().toLocaleLowerCase()) &&
        this.customerState() != ""
      ) {
        let listItem = document.createElement("li");
        listItem.classList.add("list-items");
        listItem.onclick = () => {
          // this.displayStateNames(i);
          this.removeElements();
        };
        let word = "<b>" + i.substr(0, this.customerState().length) + "</b>";
        word += i.substr(this.customerState().length);
        listItem.innerHTML = word;
        document.querySelector(".suggestions-state")!.appendChild(listItem);
      }
    }
  }

  //to-do both display functions need rewritten

  displayCityNames(value: string) {
    value = this.customerCity();
  }

  displayStateNames(value: string) {
    this.customerState(value);
  }
  removeElements() {
    let item = document.querySelectorAll(".list-items");
    item.forEach((item) => {
      item.remove();
    });
  }
}

Route();

ko.applyBindings(new RouteViewModel());
