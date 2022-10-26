function Apps() {
  self = this;

  self.tableResults = ko.observable("");
  self.routeName = ko
    .observable("")
    .extend({ required: true, minLength: 2, maxLength: 6 });
  self.customerName = ko.observable("").extend({
    required: true,
    minLength: 2,
    maxLength: 50,
    message: "hello world",
  });
  self.street = ko
    .observable("")
    .extend({ required: true, minLength: 2, maxLength: 20 });
  self.city = ko
    .observable("")
    .extend({ required: true, minLength: 2, maxLength: 20 });
  self.state = ko
    .observable("")
    .extend({ required: true, minLength: 2, maxLength: 2 });
  self.zip = ko
    .observable("")
    .extend({ required: true, minLength: 5, maxLength: 5 });
  self.phone = ko.observable("").extend({
    required: true,
    pattern: {
      params: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
    },
  });
  self.key = ko.observable("").extend({ required: true });
  self.quantity = ko.observable("").extend({ required: true });
  self.stopNotes = ko
    .observable("")
    .extend({ required: true, minLength: 2, maxLength: 500 });

  //Customer Form Submit(API Future)
  self.handleCustomerFormSubmit = function () {
    console.log("Submit Form");
    let customerInfo = {
      customerName: self.customerName(),
    };
    console.log(customerInfo);
  };

  //Route Name Form Submit(API Future)
  self.handleRouteNameSubmit = function () {
    console.log("Submit Route Name");
    let routeInfo = {
      routeName: self.routeName(),
    };
    console.log(routeInfo);
  };
}
const knockoutApps = document.querySelector(".container");
ko.applyBindings(new Apps(), knockoutApps); //

// (function () {
//   let selectedRow = null;
//   let tableResults = document.querySelector(".table-results");
//   const form = document.querySelector(".customer-form");
//   const customerName = document.querySelector(".c-name");
//   const street = document.querySelector(".input-street");
//   const city = document.querySelector(".input-city");
//   const state = document.querySelector(".input-state");
//   const zip = document.querySelector(".input-zip");
//   const phone = document.querySelector(".c-phone");
//   const key = document.querySelector(".key");
//   const quantity = document.querySelector(".quantity");
//   const stopNotes = document.querySelector(".stop-notes");
//   const modal = document.querySelector(".modal");
//   const overlay = document.querySelector(".overlay");
//   const btnCloseModal = document.querySelector(".close-modal");
//   const modalContent = document.querySelector(".modal-content");

//   //Add Route Name onclick
//   document
//     .querySelector(".create-route-button")
//     .addEventListener("click", function () {
//       const routeName = document.querySelector(".route-name").value;

//       if (!routeName) {
//         document.querySelector(".route-name-display").textContent =
//           "Create Route";
//       } else {
//         document.querySelector(".route-name-display").textContent = routeName;
//         document.querySelector(".route-name").value = "";
//       }
//     });

//   //Add customer info to table/modal

//   function addCustomer() {
//     let tr = document.createElement("tr");
//     let tbody = document.querySelector(".tbody");
//     tr.innerHTML = `
//                  <td>${tableResults.rows.length}</td>
//                  <td class="modal-name">${customerName.value}</td>
//                  <td>${street.value} ${city.value} ${state.value} ${zip.value}
//                  <td>${phone.value}</td>
//                  <td>${key.value}</td>
//                  <td>${quantity.value}</td>
//                  <td><button class="button edit">Edit</button></td>
//                  <td><button class="button delete">Delete</button></td>`;

//     tbody.appendChild(tr);

//     //Open Modal

//     const btnsOpenModal = document.getElementsByClassName("modal-name");
//     const closeModal = function () {
//       modal.classList.add("hidden");
//       overlay.classList.add("hidden");
//     };

//     //Modal inner content

//     const openModal = function (name, notes) {
//       modal.classList.remove("hidden");
//       overlay.classList.remove("hidden");
//       console.log(notes);
//       modalContent.innerHTML = ` <h1>${name}</h1> <br> ${notes}`;
//     };

//     //modal inner content parameters
//     for (let i = 0; i < btnsOpenModal.length; i++) {
//       let notes = stopNotes.value;
//       btnsOpenModal[i].addEventListener("click", (e) => {
//         e.preventDefault();
//         let div = e.target.parentElement;
//         let name = div.children[1].innerHTML;
//         openModal(name, notes);
//       });
//     }

//     //Close Modal
//     btnCloseModal.addEventListener("click", closeModal);
//     overlay.addEventListener("click", closeModal);

//     //Close Modal with escape key
//     document.addEventListener("keydown", function (e) {
//       if (e.key === "Escape" && !modal.classList.contains("hidden")) {
//         closeModal();
//       }
//     });
//   }

//   //Clear customer forms

//   function clearForm() {
//     customerName.value = "";
//     street.value = "";
//     city.value = "";
//     state.value = "";
//     zip.value = "";
//     phone.value = "";
//     key.value = "";
//     quantity.value = "";
//     stopNotes.value = "";
//   }

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     addCustomer();
//     clearForm();
//   });
// })();
