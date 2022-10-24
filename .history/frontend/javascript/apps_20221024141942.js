// "use strict";

//Add Route Name onclick
document
  .querySelector(".create-route-button")
  .addEventListener("click", function () {
    const routeName = document.querySelector(".route-name").value;

    if (!routeName) {
      document.querySelector(".route-name-display").textContent =
        "Create Route";
    } else {
      document.querySelector(".route-name-display").textContent = routeName;
    }
  });

let selectedRow = null;

                   
let tableResults = document.querySelector('.table-results');
const form = document.querySelector('.customer-form');
const customerName = document.querySelector('.c-name');
const street = document.querySelector('.input-street')
const city = document.querySelector('.input-city')
const state = document.querySelector('.input-state');
const zip = document.querySelector('.input-zip')
const phone = document.querySelector('.c-phone')
const key = document.querySelector('.key')
const quantity = document.querySelector('.quantity')
const stopNotes = document.querySelector('.stop-notes')


function addRoute(){
let tr = document.createElement('tr')
console.log(phone, phone.value)
let tbody = document.querySelector('.tbody');
tr.innerHTML = `
                 <td>${tableResults.rows.length}</td>
                 <td class="show-modal">${customerName.value}</td>
                 <td>${street.value}, ${city.value}, ${state.value} ${zip.value} 
                 <td>${phone.value}</td>
                 <td>${key.value}</td>
                 <td>${quantity.value}</td>  
                 <td><button class="edit">Edit</button></td>
                 <td><button class="delete">Delete</button></td>`
   
   tbody.appendChild(tr)         
}

function clearForm(){
customerName.value = "";
street.value = "";
city.value = "";
state.value = "";
zip.value = "";
phone.value = "";
key.value = "";
quantity.value = "";
stopNotes.value = ""

}





form.addEventListener('submit', (e)=>{
  e.preventDefault();
  addRoute();
  clearForm()
})
// function onFormSubmit(e) {
//   event.preventDefault();
//   let formData = readFormData();
//   if (selectedRow === null) {
//     insertNewRecord(formData);
//   } else {
//     updateRecord(formData);
//   }
//   resetForm();
// }

// //Retrieving form data
// function readFormData() {
//   var formData = {};
//   formData["c-name"] = document.getElementById("c-name").value;
//   formData["input-street"] = document.getElementById("input-street").value;
//   formData["input-city"] = document.getElementById("input-city").value;
//   formData["input-state"] = document.getElementById("input-state").value;
//   formData["input-zip"] = document.getElementById("input-zip").value;
//   formData["phone"] = document.getElementById("phone").value;
//   formData["key"] = document.getElementById("key").value;
//   formData["quantity"] = document.getElementById("quantity").value;
//   formData["stop-notes"] = document.getElementById("stop-notes").value;

//   return formData;
// }

// //Insert the data
// function insertNewRecord(data) {
//   var table = document
//     .getElementsByClassName(".table-results")
//     .getElementsByTagName("tbody")[0];
//   var newRow = table.insertRow(table.length);
//   var cell1 = newRow.insertCell(0);
//   cell1.innerHTML = data.c - name;
//   var cell2 = newRow.insertCell(1);
//   cell2.innerHTML = data.input - street;
//   var cell3 = newRow.insertCell(2);
//   cell3.innerHTML = data.phone;
//   var cell4 = newRow.insertCell(3);
//   cell4.innerHTML = data.key;
//   var cell5 = newRow.insertCell(4);
//   cell4.innerHTML = data.quantity;
//   var cell6 = newRow.insertCell(6);
//   // cell5.innerHTML = `<button onClick='onEdit(this)'>Edit</button> <button onClick='onDelete(this)'>Delete</button>`;
// }

//Edit the data
// function onEdit(td) {
//   selectedRow = td.parentElement.parentElement;
//   document.getElementsByClassName(".c-name").value =
//     selectedRow.cells[0].innerHTML;
//   document.getElementsByClassName(".input-street").value =
//     selectedRow.cells[1].innerHTML;
//   document.getElementsByClassName(".phone").value =
//     selectedRow.cells[2].innerHTML;
//   document.getElementsByClassName(".key").value =
//     selectedRow.cells[3].innerHTML;
//   document.getElementsByClassName(".quantity").value =
//     selectedRow.cells[4].innerHTML;
//   // document.getElementsByClassName(".stop-notes").value =
//   //   selectedRow.cells[5].innerHTML;
// }

// function updateRecord(formData) {
//   selectedRow.cells[0].innerHTML = formData.c - name;
//   selectedRow.cells[1].innerHTML = formData.input - street;
//   selectedRow.cells[2].innerHTML = formData.phone;
//   selectedRow.cells[3].innerHTML = formData.key;
//   selectedRow.cells[4].innerHTML = formData.quantity;
// }

// Modal open/close

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
const modalContent = document.querySelector('.modal-content')
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = function (name) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  modalContent.innerHTML = ` my name o
  is ${name}`



for (let i = 0; i < btnsOpenModal.length; i++){
  console.log(btnsOpenModal[i].addEventListener("click", (e)=>{
    e.preventDefault()
    var div = this.parentElement.parentElement;
    let name = div.children[0].innerHTML
       openModal
  })

}
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
