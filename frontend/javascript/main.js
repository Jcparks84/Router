requirejs([], function Main() {
  // "use strict";
  let routes = []; // Variable all imported routes are stored in

  // Import Routes

  fetch("../libraries/routes.json")
    .then((r) => r.json())
    .then((data) => routes.push(...data));

  let routeNames = []; // Variable all route names are saved

  function getRouteNames() {
    for (let i = 0; i < routes.length; i++) {
      let currentName = routes[i].name;
      routeNames.push(currentName);
    }
  }

  window.addEventListener("load", (event) => {
    getRouteNames();
  });

  ///////////////////////////// Create Route Form ////////////////////////////

  // Create Route

  let createdRoute = [];
  let newCustomer = [];
  let addresses = [];

  let createRouteBtn = document.querySelector(".create-route-button");
  createRouteBtn.addEventListener("click", (e) => {
    displayCreatedRouteName();
    clearRouteForm();
  });

  // Displays Created Route in HTML
  let routeHTML = document.querySelector(".route-span");
  let routeName = document.querySelector(".route-name");

  function displayCreatedRouteName() {
    let r = routeName.value;
    routeHTML.innerHTML = r;
    validateForm(r);
    createNewRoute(r);
  }

  function validateForm(r) {
    if (r === "") {
      alert("Please enter a route name");
      return false;
    } else if (r === routeNames) {
      alert("Please choose another name");
      return false;
    } else {
      return true;
    }
  }

  // Create Route Object
  function createNewRoute(r) {
    let obj = { name: r, customers: [] };
    createdRoute.push(obj);
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
    createdRoute[0].customers.push(customerInfo);
    console.warn("STOP ADDED", customerInfo);
    addFormCustomerToTable(customerInfo);
    getTotalCases(customerInfo);
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

  console.log(document.querySelector(".cases-span").textContent);

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
    quantity.value = "";
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
        i.toLocaleLowerCase().startsWith(inputCity.value.toLocaleLowerCase()) &&
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

  /////////////////////////////////////////// Modal ////////////////////////////////////////

  const openImportModal = document.querySelectorAll("[data-modal-target]");
  const closeImportModal = document.querySelectorAll("[data-close-button]");
  const importOverlay = document.getElementById("import-overlay");

  openImportModal.forEach((button) => {
    button.addEventListener("click", () => {
      const importModal = document.querySelector(button.dataset.modalTarget);
      openModal(importModal);
      modalContent();
    });
  });

  closeImportModal.forEach((button) => {
    button.addEventListener("click", () => {
      clearModalContent();
      const importModal = button.closest(".modal-import");
      closeModal(importModal);
    });
  });

  function openModal(importModal) {
    if (importModal === null) return;
    importModal.classList.add("active");
    importOverlay.classList.add("active");
  }

  function closeModal(importModal) {
    if (importModal === null) return;
    importModal.classList.remove("active");
    importOverlay.classList.remove("active");
  }

  ///////////////////////Add Routes To Modal////////////////////////////////////

  const modalul = document.querySelector(".ul-modal-route");

  function modalContent() {
    routeNames.forEach((r) => {
      let li = document.createElement("li");
      li.classList.add("modal-route");
      li.innerText = r;
      modalul.appendChild(li).addEventListener("click", (e) => {
        let route = e.target.textContent;
        addRouteName(route);
      });
    });
  }

  // Clear Modal content... Added to close modal

  function clearModalContent() {
    modalul.innerHTML = " ";
  }

  // Add Route Name to HTML

  function addRouteName(r) {
    let routeNameHtml = document.querySelector(".route-span");
    routeNameHtml.innerHTML = r;
    getCustomers(r);
  }

  function getCustomers(r) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].name === r) {
        let customers = routes[i].customers;
        addCustomersToTable(customers);
      }
    }
  }

  // Add Customers to HTML Table

  function addCustomersToTable(customers) {
    let newData = customers
      .map(
        (c, i) => `<tr key=${i}>
                                          <td>${i + 1}</td>
                                        <td customer-modal-target="#modal-import" >${
                                          c.name
                                        }</td>
                                    <td> ${Object.values(c.address).join(
                                      ","
                                    )}</td>
                                        <td>${c.phone}</td>
                                        <td>${c.key}</td>
                                        <td>${c.cases}</td>
                                        <td style="display: none" >${
                                          c.driverNotes
                                        }</td>
                                     </tr>`
      )
      .join("");

    tbody.innerHTML = newData;
    getImportTotalCases(customers);
  }

  function getImportTotalCases(customers) {
    let casesHTML = document.querySelector(".cases-span");
    let cases = customers.map(({ cases }) => {
      return parseInt(cases, 10);
    });
    console.log(cases);
    let totalCases = cases.reduce(function (a, b) {
      return a + b;
    }, 0);
    casesHTML.innerHTML = totalCases;
  }

  /////////////////////////////////// StopInfo Modal //////////////////////////////////

  const openCustomerModal = document.querySelectorAll(
    "[data-customer-modal-target]"
  );
  const closeCustomerModal = document.querySelectorAll("[data-close-button]");
  //   const importOverlay = document.getElementById("import-overlay");

  openCustomerModal.forEach((button) => {
    button.addEventListener("click", () => {
      const CustomerModal = document.querySelector(
        button.dataset.customerModalTarget
      );
      openModal(CustomerModal);
    });
  });

  closeCustomerModal.forEach((button) => {
    button.addEventListener("click", () => {
      clearModalContent();
      const CustomerModal = button.closest(".modal-customer");
      closeModal(CustomerModal);
    });
  });

  function openModal(CustomerModal) {
    if (CustomerModal === null) return;
    CustomerModal.classList.add("active");
    importOverlay.classList.add("active");
  }

  function closeModal(CustomerModal) {
    if (CustomerModal === null) return;
    CustomerModal.classList.remove("active");
    importOverlay.classList.remove("active");
  }

  // Clear Table

  let clearTableBtn = document.querySelector(".clearTable");
  clearTableBtn.addEventListener("click", (e) => {
    clearTable(e);
  });

  function clearTable() {
    $("#tbody").empty();
  }
})();
