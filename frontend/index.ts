import { pubSub } from "./src/libraries/pubsub.js";
import { CustomerProps, RouteProps, AddressProps, LocationProps } from "./src/interface.js";
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
  matchingLocations: LocationProps[]
  sortedLocations: LocationProps[]


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
    this.matchingLocations = []
    this.sortedLocations = this.matchingLocations.sort()
  }

  onRouteButtonClick() {
    $("#tbody").empty;
    const route = {
      name: this.routeName(),
    };
    pubSub.publish("route", route);
  }

  onCustomerButtonClick() {
    this.addCustomer()
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
    console.log(newCustomer.name);
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

  getMatchingLocations(){
    fetch("/frontend/src/libraries/locations.json")
    .then((res) => res.json())
    .then((data) => this.matchingLocations.push(...data));    
  }



}

ko.applyBindings(new routeViewModel());
