"use strict";

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

//Working on populating table from form

document
  .querySelector(".add-stop-button")
  .addEventListener("click", function () {
    const name = document.querySelector(".name").value;
    const street = document.querySelector(".input-street").value;
    const city = document.querySelector(".input-city").value;
    const state = document.querySelector(".input-state").value;
    const zip = document.querySelector(".input-zip").value;
    const phone = document.querySelector(".phone").value;
    const key = document.querySelector(".key").value;
    const quantity = document.querySelector(".quantity").value;
  });

let list1 = [];
let list2 = [];
let list3 = [];
let list4 = [];
let list5 = [];
let list6 = [];

let n = 1;
let x = 0;

function addTableRow() {
  let addRow = document.getElementById("table-results");
  let newRow = addRow.insertRow(n);

  list1[x] = n++;
  list2[x] = document.getElementById("name").value;
  list3[x] = document.getElementById("input-street").value;
  list4[x] = document.getElementById("phone").value;
  list5[x] = document.getElementById("key").value;
  list6[x] = document.getElementById("quantity").value;

  let cel1 = newRow.insertCell(0);
  let cel2 = newRow.insertCell(1);
  let cel3 = newRow.insertCell(2);
  let cel4 = newRow.insertCell(3);
  let cel5 = newRow.insertCell(4);
  let cel6 = newRow.insertCell(5);

  cel1.innerHTML = list1[x];
  cel2.innerHTML = list2[x];
  cel3.innerHTML = list3[x];
  cel4.innerHTML = list4[x];
  cel5.innerHTML = list5[x];
  cel6.innerHTML = list6[x];

  n++;
  x++;
}

// Modal open/close

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  console.log(btnsOpenModal[i].addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
