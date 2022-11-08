requirejs([], function App() {
  let selectedRow = null;
  let tableResults = document.querySelector(".table-results");
  let suggestions = document.querySelector(".suggestions");
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
  const stopInfomodal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const btnCloseModal = document.querySelector(".close-modal");
  const modalContent = document.querySelector(".modal-content");
  let routes = [];
  let route = [];
  let addresses = [];
  let locations = [];

  //Get Routes
 const menudropDown = document.querySelector('.')
  const eachdropDown = docuemnt.createElement('li')
  
  const dropdowns = document.querySelectorAll('.menu-dropdown-li')
 
  console.log(dropdowns)
 
  fetch("../libraries/routes.json")
    .then((r) => r.json())
    .then((data) => routes.push(...data));
     
    function getRoute(){
    for (let i =0; i < dropdowns.length; i++){
    let dropDown =      dropdowns[i].firstElementChild.text;
    console.log(dropDown)
          let currentName = routes.find(r=> r.name == dropDown )
  console.log(currentName)
    }
  // const currentRoute = routes.
  } 

for(let i =0; i < dropdowns.length; i++){
  dropdowns[i].addEventListener('click', (e)=>{
    getRoute()
  })
}
  //TypeAhead Textbox

  fetch("../libraries/locations.json")
    .then((res) => res.json())
    .then((data) => locations.push(...data));

  function findMatches(wordToMatch) {
    return locations.filter((place) => {
      let regex = new RegExp(wordToMatch, "gi");
      return place.city.match(regex) || place.state.match(regex);
    });
  }

  // Display TypeAhead Matches

  function displayMatches() {
    const matchArray = findMatches(this.value, locations);
    const html = matchArray.map((place) => {
      return `
    <li>
    <span class = "suggestions-city">${place.city}</span>
    `;
    });
    suggestions.innerHTML = html;
  }

  city.addEventListener("keyup", displayMatches);

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

  // Display Routes in import button Modal

  const openImportModal = document.querySelectorAll("[data-modal-target]");
  const closeImportModal = document.querySelectorAll("[data-close-button]");
  const importOverlay = document.getElementById("import-overlay");

  openImportModal.forEach((button) => {
    button.addEventListener("click", () => {
      const importModal = document.querySelector(button.dataset.modalTarget);
      openModal(importModal);
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

  //Type ahead city listner

  city.addEventListener("keydown", (e) => {
    let c = findMatches(city.value);
    console.log(c);
  });

  // Type ahead state listner

  state.addEventListener("keydown", (e) => {
    let s = findMatches(state.value);
    console.log(s);
  });
})();
