import { pubSub } from "./pubSub.js";
import {
  CustomerProps,
  RouteProps,
  AddressProps,
  LocationProps,
} from "./interface.js";
import validation from "knockout.validation";

declare var ko: KnockoutStatic;

export class FormViewModel {
  routeName = ko.observable("");
  casesCount = ko.observable(0); // total cases of customers
  customerName = ko.observable("");
  customerStreet = ko.observable("");
  customerCity = ko.observable("");
  cityMatches: KnockoutObservableArray<string> = ko.observableArray(); //holds matched cities
  customerState = ko.observable("");
  stateMatches: KnockoutObservableArray<string> = ko.observableArray();
  customerZip = ko.observable("");
  customerPhone = ko.observable("");

  keystop = ko.observable("No");
  keystopOptions = ko.observableArray(["Yes", "No"]);

  customerCases = ko.observable(0);
  stopNotes = ko.observable("");
  addresses: AddressProps[] = [];
  customers: KnockoutObservableArray<CustomerProps> = ko.observableArray();
  routes: KnockoutObservableArray<RouteProps> = ko.observableArray();
  route: RouteProps = {
    name: '',
    customers: this.customers(),
  };
  matchingLocations: LocationProps[] = [];
  sortedLocations: LocationProps[] = [];

  routesModal = ko.observable(false);

  constructor() {}

  navRoutesButton() {
    this.routes([]);
    this.getRoutes();
  }

  clearCustomerForm() {
    this.customerName("");
    this.customerStreet("");
    this.customerCity("");
    this.customerState("");
    this.customerZip("");
    this.customerPhone("");
    this.keystop("No");
    this.customerCases(0);
    this.stopNotes("");
    this.cityMatches([])
    this.stateMatches([])
  }

  onRouteButtonClick() {
    this.addRoute();
  }

  onCustomerButtonClick() {
    this.addCustomer();
    this.clearCustomerForm();
  }

  addRoute() {
    this.route.name = this.routeName();
  }

  addCustomer() {
    let newCustomer: CustomerProps = {
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

  updateTotalCases(newCustomer: CustomerProps) {
    let cases = Number(newCustomer.cases);
    this.casesCount(this.casesCount() + cases);
  }

  getMatchingLocations() {
    fetch("/frontend/src/libraries/locations.json")
      .then((res) => res.json())
      .then((data) => this.matchingLocations.push(...data));
  }

  matchingCities() {
    this.getMatchingLocations();
    let sortedLocations = this.matchingLocations.sort();
    const cityMultiples = sortedLocations.map((locations) => {
      return locations.city as string;
    });
    let cities = [...new Set(cityMultiples)];
    for (let i of cities) {
      if (
        i!
          .toLocaleLowerCase()
          .startsWith(this.customerCity().toLocaleLowerCase()) &&
        this.customerCity() != ""
      ) {
        this.cityMatches([]);
        this.cityMatches.push(i);
      }
    }
  }

  matchingStates() {
    this.getMatchingLocations();
    let sortedLocations = this.matchingLocations.sort();
    const statesMultiples = sortedLocations.map((locations) => {
      return locations.state as string;
    });
    let states = [...new Set(statesMultiples)];
    for (let i of states) {
      if (
        i!
          .toLocaleLowerCase()
          .startsWith(this.customerState().toLocaleLowerCase()) &&
        this.customerState() != ""
      ) {
        this.stateMatches([]);
        this.stateMatches.push(i);
      }
    }
  }

  onImportButtonClick() {
    this.routes([]);
    this.routesModal(true);
    this.getRoutes();
  }

  onRouteClick(data: RouteProps) {
    let selectedRoute: RouteProps = data;
    this.customers(selectedRoute.customers!)
  }

  getRoutes() {
    fetch("../libraries/routes.json")
      .then((r) => r.json())
      .then((data) => this.routes.push(...data));
  }

  modalCloseButton() {
    this.routesModal(false);
  }

  onExportButtonClick() {
    this.routes.push(this.route);
  }

  clearTable(){
    
  }
}

ko.applyBindings(new FormViewModel());
