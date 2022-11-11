requirejs([], function App() {
  let selectedRow = null;
  let tableResults = document.querySelector(".table-results");
  let suggestions = document.querySelector(".suggestions");
  let routeForm = document.querySelector(".route-form");
  let customerForm = document.querySelector(".customer-form");
  let routeName = document.querySelector(".route-name");
  let customerName = document.querySelector(".c-name");
  let street = document.querySelector(".input-street");
  let city = document.querySelector(".input-city");
  let state = document.querySelector(".input-state");
  let zip = document.querySelector(".input-zip");
  let phone = document.querySelector(".c-phone");
  let key = document.querySelector(".key");
  let quantity = document.querySelector(".quantity");
  let stopNotes = document.querySelector(".stop-notes");
  let stopInfomodal = document.querySelector(".modal");
  let overlay = document.querySelector(".overlay");
  let btnCloseModal = document.querySelector(".close-modal");
  let modalContent = document.querySelector(".modal-content");
  let btnDelete = document.querySelector(".button delete");
  let routes = []; // import routes
  let route = []; // export route
  let addresses = [];
  let locations = [];

  const menudropDown = document.querySelector(".menu-dropdown");
  const routedropDown = document.getElementById("route");

  //Get Routes

  fetch("../libraries/routes.json")
    .then((r) => r.json())
    .then((data) => routes.push(...data));

  // Display Routes in NavBar Dropdown

  routedropDown.addEventListener("mouseover", () => {
    let tbody = document.querySelector(".tbody");
    let nameArray = routes.map((r) => r.name);
    nameArray = nameArray
      .map((n) => `<li class="menu-dropdown-li">${n}</li>`)
      .join("");
    menudropDown.innerHTML = nameArray;
    const dropdowns = document.querySelectorAll(".menu-dropdown-li");

    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].addEventListener("click", (e) => {
        e.preventDefault();

        let dropDown = e.target.textContent;
        let currentName = routes.filter((r) => r.name == dropDown);
        let customers = currentName.map((elem) => elem.customers);
        let newData = customers[0]
          .map(
            (c, i) => `<tr key=${i}>
                                    <td>${tableResults.rows.length}</td>
                                  <td>${c.name}</td>
                              <td> ${Object.values(c.address).join(",")}</td>
                                  <td>${c.phone}</td>
                                  <td>${c.key}</td>
                                  <td>${c.cases}</td>
                                  <td><button class="button edit">Edit</button></td>
                                  <td><button class="button delete">Delete</button></td>
                               </tr>`
          )
          .join("");

        tbody.innerHTML = newData;
      });
    }
  });

  //TypeAhead Textbox, Get

  fetch("../libraries/locations.json")
    .then((res) => res.json())
    .then((data) => locations.push(...data));

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
        // listItem.setAttribute("onclick", "displayNames('" + i + "')");
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
    //Clear all the items
    let item = document.querySelectorAll(".list-items");
    item.forEach((item) => {
      item.remove();
    });
  }

  // Add Route to html
  function addRouteDisplay() {
    let span = document.querySelector("route-span");
    let h1 = document.querySelector(".route-name-display");
    span.innerHTML = `${routeName.value}`;
    h1.append(span);
  }

  //Add customer info to table/modal

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
                 <td><button class="button edit">Edit</button></td>
                 <td><button class="button delete">Delete</button></td>`;

    tbody.appendChild(tr);

    //Open Modal

    const btnsOpenModal = document.getElementsByClassName("modal-name");
    const closeModal = function () {
      stopInfomodal.classList.add("hidden");
      overlay.classList.add("hidden");
    };

    //Modal inner content

    const openModal = function (name, notes) {
      stopInfomodal.classList.remove("hidden");
      overlay.classList.remove("hidden");
      console.log(notes);
      modalContent.innerHTML = ` <h1>${name}</h1> <br> ${notes}`;
    };

    //modal inner content parameters
    for (let i = 0; i < btnsOpenModal.length; i++) {
      let notes = stopNotes.value;
      btnsOpenModal[i].addEventListener("click", (e) => {
        e.preventDefault();
        let div = e.target.parentElement;
        let name = div.children[1].innerHTML;
        openModal(name, notes);
      });
    }

    //Close Modal
    btnCloseModal.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    //Close Modal with escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !stopInfomodal.classList.contains("hidden")) {
        closeModal();
      }
    });
  }

  // Table Row Delete button !!!-FIX, click anywhere delets rows -!!!

  function onDeleteRow(e) {
    if (e.target.classList.contains("button-delete")) {
      return;
    }
    const btn = e.target;
    btn.closest("tr").remove();
  }

  tableResults.addEventListener("click", onDeleteRow);

  // Display Routes in import button Modal

  const openImportModal = document.querySelectorAll("[data-modal-target]");
  const closeImportModal = document.querySelectorAll("[data-close-button]");
  const importOverlay = document.getElementById("import-overlay");
  const modalRouteDisplay = document.querySelector(".ul-modal-route");
  const modalImporter = document.querySelectorAll(".modal-route");

  //Open Modal

  openImportModal.forEach((button) => {
    button.addEventListener("click", () => {
      const importModal = document.querySelector(button.dataset.modalTarget);
      openModal(importModal);
      let tbody = document.querySelector(".tbody");
      let routeNames = routes.map((r) => r.name);

      //Add Routes To Modal
      routeNames = routeNames
        .map((n) => `<li class="modal-route">${n}</li>`)
        .join("");
      modalRouteDisplay.innerHTML = routeNames;

      //Add Routes to table
      const routeName = document.querySelectorAll(".modal-route");
      for (let i = 0; i < routeName.length; i++) {
        routeName[i].addEventListener("click", (e) => {
          e.preventDefault();

          //Add Route Name
          let routeSpan = document.querySelector(".route-span");
          let display = e.target.textContent;
          let currentName = routes.filter((r) => r.name == display);
          routeSpan.innerHTML = currentName.map((elem) => elem.name);

          //Add Customer Data To Table
          let customers = currentName.map((elem) => elem.customers);
          let newData = customers[0]
            .map(
              (c, i) => `<tr key=${i}>
                                      <td>${tableResults.rows.length}</td>
                                    <td>${c.name}</td>
                                <td> ${Object.values(c.address).join(",")}</td>
                                    <td>${c.phone}</td>
                                    <td>${c.key}</td>
                                    <td>${c.cases}</td>
                                    <td><button class="button edit">Edit</button></td>
                                    <td><button class="button delete">Delete</button></td>
                                 </tr>`
            )
            .join("");

          tbody.innerHTML = newData;

          //Add Total Cases
          let caseSpan = document.querySelector(".cases-span");
          console.log("!!!-CUSTOMERS-!!!", customers);
          let cases = customers[0].map(({ cases }) => {
            return parseInt(cases, 10);
          });
          console.log(cases);
          let totalCases = cases.reduce(function (a, b) {
            return a + b;
          }, 0);
          console.log(totalCases);
          caseSpan.innerHTML = totalCases;
        });
      }
    });
  });

  overlay.addEventListener("click", () => {
    const importModals = document.querySelectorAll(".modal-import.active");
    importModals.forEach((importModal) => {
      closeModal(importModal);
    });
  });

  closeImportModal.forEach((button) => {
    button.addEventListener("click", () => {
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

  //Clear customer forms

  function clearCustomerForm() {
    customerName.value = "";
    street.value = "";
    city.value = "";
    state.value = "";
    zip.value = "";
    phone.value = "";
    key.value = "";
    quantity.value = "";
    stopNotes.value = "";
  }

  function clearRouteForm() {
    routeName.value = "";
  }

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
    route.push(customerInfo);
    addresses.push({
      street: customerInfo.address.street,
      city: customerInfo.address.city,
      state: customerInfo.address.state,
      zip: customerInfo.address.zip,
    });
    localStorage.setItem("addresses", JSON.stringify(addresses));
    localStorage.setItem("routes", JSON.stringify(route));
    console.warn("!!!-ROUTE-!!!", route);
  }

  // Route Form eventListner

  routeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addRouteDisplay();
    clearRouteForm();
  });

  // Customer Form eventListner

  customerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addCustomerTable();
    addCustomer();
    clearCustomerForm();
  });
})();
