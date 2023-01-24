import { pubSub } from "./pubSub.js";
import {
  CustomerProps,
  RouteProps,
  AddressProps,
  LocationProps,
} from "./interface.js";

declare var ko: KnockoutStatic;

export class FormViewModel {
  routeName = ko.observable("");
  displayRouteName = ko.observable("");
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
  displayCustomers = ko.observable();
  routes: KnockoutObservableArray<RouteProps> = ko.observableArray();
  route: RouteProps = {
    name: "",
    customers: this.customers(),
  };
  displayRoute = ko.observable([]);
  matchingLocations: LocationProps[] = [];
  sortedLocations: LocationProps[] = [];

  routesModal = ko.observable(false);
  stopInfoModal = ko.observable(false);
  displayNotes = ko.observable("");
  selectedRoute = "";
  constructor() {}

  navRoutesButton() {
    this.routes([]);
    // this.getRoutes();
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
    this.cityMatches([]);
    this.stateMatches([]);
  }

  onRouteButtonClick() {
    this.addRouteName();
  }

  onCustomerButtonClick() {
    this.addCustomer();
    this.clearCustomerForm();
  }

  addRouteName() {
    this.route.name = this.routeName();
    this.displayRouteName(this.route.name);
    fetch("http://localhost:7000/addRoute", {
      method: "POST",
      body: JSON.stringify({
        routeName: this.routeName(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    this.routeName("");
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
    fetch("http://localhost:7000/addCustomer", {
      method: "POST",
      body: JSON.stringify({
        name: this.customerName(),
        cases: this.customerCases(),
        key: this.keystop(),
        phone: this.customerPhone(),
        notes: this.stopNotes(),
        street: this.customerStreet(),
        city: this.customerCity(),
        state: this.customerState(),
        zip: this.customerZip(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  updateTotalCases(newCustomer: CustomerProps) {
    let cases = Number(newCustomer.cases);
    this.casesCount(this.casesCount() + cases);
  }

  getMatchingLocations() {
    fetch("/frontend/libraries/locations.json")
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

  onMatchingLocationClick(event: any) {
    // const selectedLocation = event.target.innertext;
    // console.log(selectedLocation);
  }

  onImportButtonClick() {
    this.routes([]);
    this.getRoutes();
    this.routesModal(true);
    // this.stopInfoModal(false)
    // this.updateTotalCases();
  }

  onTableCustomerClick(data: any) {
    console.log("clicked");
    let x = data.driverNotes;
    this.displayNotes(x);
    this.stopInfoModal(true);
  }

  onRouteClick(data: RouteProps) {
    // this.displayCustomers(this.customers)
    let selectedRoute: RouteProps = data;
    this.customers(selectedRoute.customers!);
    this.displayRouteName(selectedRoute.name!);
    // pubSub.publish("selectedRoute", selectedRoute)
    let customers = selectedRoute.customers;
    let cases: number[] = [];
    customers!.forEach(function (customer) {
      let x: any = customer.cases!;
      cases.push(parseInt(x));
    });
    let sum = cases.reduce(function (a: any, b: any) {
      return a + b;
    }, 0);
    this.casesCount(0);
    this.casesCount(this.casesCount() + sum);
  }

  // updateTotalCases(newCustomer: CustomerProps) {
  //   let cases = Number(newCustomer.cases);
  //   this.casesCount(this.casesCount() + cases);
  // }

  getRoutes() {
    fetch("../libraries/routes.json")
      .then((r) => r.json())
      .then((data) => this.routes.push(...data));
  }

  modalCloseButton() {
    this.routesModal(false);
    this.stopInfoModal(false);
  }

  onExportButtonClick() {
    this.routes.push(this.route);
  }

  onRunRouteButtonClick() {
    console.log("clicked");
  }

  clearAll() {
    this.clearCustomerForm();
    this.customers([]);
    this.casesCount(0);
    this.routeName("");
  }

  // getAddresses(selectedRoute: any){
  //   let route = selectedRoute.customers;
  //   for (let i = 0; i < route.length; i++) {
  //     this.addresses.push(route[i].address);
  //   }
  // }

  // displayRouteDirections(){
  //   let dir = MQ.routing.direction().on("success", function (data:any) {
  //     console.log(data);

  //   })
  // }
}

ko.options.useOnlyNativeEvents = true;
ko.applyBindings(new FormViewModel());
