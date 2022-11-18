requirejs([], function Main() {
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
    createNewRoute(r);
  }

  // Create Route Object
  function createNewRoute(r) {
    let obj = { name: r, customers: [] };
    createdRoute.push(obj);
    console.log(createdRoute);
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
    addCustomerTable();
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
    console.log(createdRoute);
    console.warn("STOP ADDED", customerInfo);
  }

  function addCustomerTable() {
    let tr = document.createElement("tr");
    let tbody = document.querySelector(".tbody");
    tr.innerHTML = `
                 <td>${tableResults.rows.length}</td>
                 <td class="modal-name">${customerName.value}</td>
                 <td>${street.value} ${city.value} ${state.value} ${zip.value}
                 <td>${phone.value}</td>
                 <td>${key.value}</td>
                 <td>${quantity.value}</td>
                 `;

    tbody.appendChild(tr);
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

  //////////////////////////// Type ahead ////////////////////////////////////////

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
    console.log(customers);
    let newData = customers
      .map(
        (c, i) => `<tr key=${i}>
                                      <td>${c.length}</td>
                                    <td>${c.name}</td>
                                <td> ${Object.values(c.address).join(",")}</td>
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
    getTotalCases(customers);
  }

  function getTotalCases(customers) {
    let casesHTML = document.querySelector(".cases-span");
    let cases = customers.map(({ cases }) => {
      return parseInt(cases, 10);
    });
    let totalCases = cases.reduce(function (a, b) {
      return a + b;
    }, 0);
    casesHTML.innerHTML = totalCases;
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
