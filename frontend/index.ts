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

export class routeViewModel {
  routeName: KnockoutObservable<string>;
  customerName: KnockoutObservable<string>;
  customerStreet: KnockoutObservable<string>;
  customerCity: KnockoutObservable<string>;
  customerState: KnockoutObservable<string>;
  customerZip: KnockoutObservable<string>;
  customerPhone: KnockoutObservable<string>;
  keystop: KnockoutObservable<string>;
  customerCases: KnockoutObservable<string>;
  stopNotes: KnockoutObservable<string>;
  addresses: AddressProps[];
  customers: CustomerProps[];
  routes: RouteProps[];
  matchingLocations: LocationProps[];
  sortedLocations: LocationProps[];

  constructor() {
    this.routeName = ko.observable("");
    this.customerName = ko.observable("");
    this.customerStreet = ko.observable("");
    this.customerCity = ko.observable("");
    this.customerState = ko.observable("");
    this.customerZip = ko.observable("");
    this.customerPhone = ko.observable("");
    this.keystop = ko.observable("");
    this.customerCases = ko.observable("");
    this.stopNotes = ko.observable("");
    this.addresses = [];
    this.customers = [];
    this.routes = [];
    this.matchingLocations = [];
    this.sortedLocations = this.matchingLocations.sort();
  }

  onRouteButtonClick() {
    $("#tbody").empty;
    const route = {
      name: this.routeName(),
    };
    pubSub.publish("route", route);
  }

  onCustomerButtonClick() {
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
    this.addFormCustomerToTable(newCustomer);
    this.getTotalCases(newCustomer);
  }

  addFormCustomerToTable(newCustomer: CustomerProps) {
    let tableResults = document.querySelector(
      ".table-results"
    ) as HTMLTableElement;
    let tr = document.createElement("tr");
    let tbody = document.querySelector(".tbody")!;
    tr.innerHTML = `
    <td>${tableResults.rows.length}</td>
    <td>${newCustomer.name}</td>
    <td>${newCustomer.address!.street} ${newCustomer.address!.city} ${
      newCustomer.address!.state
    } ${newCustomer.address!.zip}
    <td>${newCustomer.phone}</td>
    <td>${newCustomer.key}</td>
    <td>${newCustomer.cases}</td>
    `;

    tbody.appendChild(tr);
  }

  getTotalCases(newCustomer: CustomerProps) {
    let html = document.querySelector(".cases-span")!;
    let cases = JSON.parse(newCustomer.cases!);
    if (html.textContent === "") {
      html.innerHTML = cases;
    } else html.innerHTML = cases + JSON.parse(html.textContent as string);
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
    console.log(customerCity);

    this.removeElements();
    console.log(this.customerCity());
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

ko.applyBindings(new routeViewModel());
