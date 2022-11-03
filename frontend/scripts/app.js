require(["config"], function App() {
  let selectedRow = null;
  let tableResults = document.querySelector(".table-results");
  const routeForm = document.querySelector(".route-form");
  const customerForm = document.querySelector(".customer-form");
  const routeName = document.querySelector(".route-name");
  const customerName = document.querySelector(".c-name");
  const street = document.querySelector(".input-street");
  const city = document.querySelector(".input-city");
  const state = document.querySelector(".input-state");
  const zip = document.querySelector(".input-zip");
  const phone = document.querySelector(".c-phone");
  const key = document.querySelector(".key");
  const quantity = document.querySelector(".quantity");
  const stopNotes = document.querySelector(".stop-notes");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const btnCloseModal = document.querySelector(".close-modal");
  const modalContent = document.querySelector(".modal-content");
  const fs = require("js");
  let route = [];
  let addresses = [];

  // Add Route to html
  function addRouteDisplay() {
    let span = document.querySelector("span");
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
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    };

    //Modal inner content

    const openModal = function (name, notes) {
      modal.classList.remove("hidden");
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
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
      }
    });
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
    console.log("!!!-ROUTE-!!!", route);
  }

  routeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addRouteDisplay();
    clearRouteForm();
  });

  customerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addCustomerTable();
    addCustomer();
    clearCustomerForm();
  });
})();
