// This file gets all of the form inputs and displays them in the html

function Form() {
  requirejs(["./pubsub", "./form"], function () {
    // Create Route

    let routes = []; // Variable all imported routes are stored in

    let newCustomer = [];
    let addresses = [];

    let createRouteBtn = document.querySelector(".create-route-button");
    createRouteBtn.addEventListener("click", (e) => {
      displayRouteName();
      clearRouteForm();
    });

    // Displays Created Route in HTML
    let routeHTML = document.querySelector(".route-span");
    let routeName = document.querySelector(".route-name");

    function displayRouteName() {
      let r = routeName.value;
      routeHTML.innerHTML = r;
      createNewRoute(r);
    }

    function clearRouteForm() {
      routeName.value = "";
    }

    ///////// Add Customers to Route ///////

    let tableResults = document.querySelector(".table-results");
    let customerName = document.querySelector(".c-name");
    let street = document.querySelector(".input-street");
    let city = document.querySelector(".input-city");
    let state = document.querySelector(".input-state");
    let zip = document.querySelector(".input-zip");
    let phone = document.querySelector(".c-phone");
    let key = document.querySelector(".key");
    let quantity = document.querySelector(".quantity");
    let stopNotes = document.querySelector(".stop-notes");

    let addStopBtn = document.querySelector(".add-stop-button");
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
    function createNewRoute(r) {
      // let obj = { name: r, customers: [] };
      // routes.push(obj);
      pubSub.publish("route", r);
    }

    function addFormCustomerToTable(customerInfo) {
      let tr = document.createElement("tr");
      let tbody = document.querySelector(".tbody");
      tr.innerHTML = `
                       <td>${tableResults.rows.length}</td>
                       <td>${customerInfo.name}</td>
                       <td>${customerInfo.address.street} ${customerInfo.address.city} ${customerInfo.address.stae} ${customerInfo.address.zip}
                       <td>${customerInfo.phone}</td>
                       <td>${customerInfo.key}</td>
                       <td>${customerInfo.cases}</td>
                       `;

      tbody.appendChild(tr);
    }

    function getTotalCases(customerInfo) {
      let html = document.querySelector(".cases-span");
      let cases = JSON.parse(customerInfo.cases);
      if (html.textContent === "") {
        html.innerHTML = cases;
      } else html.innerHTML = cases + JSON.parse(html.textContent);
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
    fetch("../libraries/locations.json")
      .then((res) => res.json())
      .then((data) => locations.push(...data));

    let locations = [];
    let sortedLocations = locations.sort();
    let inputCity = document.querySelector(".input-city");
    let inputState = document.querySelector(".input-state");

    // Typeahead City

    inputCity.addEventListener("keyup", (e) => {
      let cities = sortedLocations.map(({ city }) => {
        return city;
      });
      removeElements();
      for (let i of cities) {
        if (
          i
            .toLocaleLowerCase()
            .startsWith(inputCity.value.toLocaleLowerCase()) &&
          inputCity.value != ""
        ) {
          let listItem = document.createElement("li");
          listItem.classList.add("list-items");
          listItem.onclick = () => {
            displayCityNames(i);
            removeElements();
          };
          let word = "<b>" + i.substr(0, inputCity.value.length) + "</b>";
          word += i.substr(inputCity.value.length);
          listItem.innerHTML = word;
          document.querySelector(".suggestions-city").appendChild(listItem);
        }
      }
    });

    // Typeahead State

    inputState.addEventListener("keyup", (e) => {
      let state = sortedLocations.map(({ state }) => {
        return state;
      });
      let states = [...new Set(state)];
      removeElements();
      for (let i of states) {
        if (
          i
            .toLocaleLowerCase()
            .startsWith(inputState.value.toLocaleLowerCase()) &&
          inputState.value != ""
        ) {
          let listItem = document.createElement("li");
          listItem.classList.add("list-items");
          // listItem.setAttribute("onclick", "displayNames('" + i + "')");
          listItem.onclick = () => {
            displayStateNames(i);
            removeElements();
          };
          let word = "<b>" + i.substr(0, inputState.value.length) + "</b>";
          word += i.substr(inputState.value.length);
          listItem.innerHTML = word;
          document.querySelector(".suggestions-state").appendChild(listItem);
        }
      }
    });

    function displayCityNames(value) {
      inputCity.value = value;
    }

    function displayStateNames(v) {
      inputState.value = v;
    }
    function removeElements() {
      let item = document.querySelectorAll(".list-items");
      item.forEach((item) => {
        item.remove();
      });
    }
  });
}
