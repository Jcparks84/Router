import { pubSub } from "./pubSub.js";
export class FormViewModel {
    constructor() {
        this.routeName = ko.observable("");
        this.casesCount = ko.observable(0); // total cases of customers
        this.customerName = ko.observable("");
        this.customerStreet = ko.observable("");
        this.customerCity = ko.observable("");
        this.cityMatches = ko.observableArray(); //holds matched cities
        this.customerState = ko.observable("");
        this.stateMatches = ko.observableArray();
        this.customerZip = ko.observable("");
        this.customerPhone = ko.observable("");
        this.keystop = ko.observable("No");
        this.keystopOptions = ko.observableArray(["Yes", "No"]);
        this.customerCases = ko.observable(0);
        this.stopNotes = ko.observable("");
        this.addresses = [];
        this.customers = ko.observableArray();
        this.routes = ko.observableArray();
        this.route = {
            name: '',
            customers: this.customers(),
        };
        this.matchingLocations = [];
        this.sortedLocations = [];
        this.routesModal = ko.observable(false);
    }
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
        this.cityMatches([]);
        this.stateMatches([]);
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
    updateTotalCases(newCustomer) {
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
            return locations.city;
        });
        let cities = [...new Set(cityMultiples)];
        for (let i of cities) {
            if (i
                .toLocaleLowerCase()
                .startsWith(this.customerCity().toLocaleLowerCase()) &&
                this.customerCity() != "") {
                this.cityMatches([]);
                this.cityMatches.push(i);
            }
        }
    }
    matchingStates() {
        this.getMatchingLocations();
        let sortedLocations = this.matchingLocations.sort();
        const statesMultiples = sortedLocations.map((locations) => {
            return locations.state;
        });
        let states = [...new Set(statesMultiples)];
        for (let i of states) {
            if (i
                .toLocaleLowerCase()
                .startsWith(this.customerState().toLocaleLowerCase()) &&
                this.customerState() != "") {
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
    onRouteClick(data) {
        let selectedRoute = data;
        this.customers(selectedRoute.customers);
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
}
ko.applyBindings(new FormViewModel());
