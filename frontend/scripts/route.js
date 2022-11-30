// This file gets all routes, either saved or inputed from forms and displays them.

function Route() {
  requirejs(["./pubsub"], function () {
    let routes = [];
    let obj = {
      name: "",
      customers: [],
    };

    pubSub.subscribe("route", (r) => {
      obj.name = r;
    });

    pubSub.subscribe("addedCustomer", (c) => {
      obj.customers.push(c);
      console.log(routes);
    });

    routes.push(obj);
    pubSub.publish("allRoutes", routes);

    let exportBtn = document.querySelector(".export");
    exportBtn.addEventListener("click", (e) => {
      console.log("clicked");
    });

    // Import Routes

    fetch("../libraries/routes.json")
      .then((r) => r.json())
      .then((data) => routes.push(...data));

    const openImportModal = document.querySelectorAll("[data-modal-target]");
    const closeImportModal = document.querySelectorAll("[data-close-button]");
    const importOverlay = document.getElementById("import-overlay");

    openImportModal.forEach((button) => {
      button.addEventListener("click", () => {
        const importModal = document.querySelector(button.dataset.modalTarget);
        openModal(importModal);
        modalImportContent();
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

    ///////////////////////Add Routes To Modal////////////////////////////////////

    const modalul = document.querySelector(".ul-modal-route");

    function modalImportContent() {
      routes.forEach((r) => {
        let li = document.createElement("li");
        li.classList.add("modal-route");
        let a = document.createElement("a");
        a.innerText = r.name;
        a.href = "#route-display";
        modalul
          .appendChild(li)
          .appendChild(a)
          .addEventListener("click", (e) => {
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
          let selectedRoute = routes[i];
          pubSub.publish("selectedRoute", selectedRoute);
          let customers = routes[i].customers;
          addCustomersToTable(customers);
          pubSub.publish("customers", { customers });
        }
      }
    }

    // Add Customers to HTML Table

    function addCustomersToTable(customers) {
      let newData = customers
        .map(
          (c, i) => `<tr key=${i}>
                                          <td>${i + 1}</td>
                                        <td>${c.name}</td>
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

    // Clear Table

    let clearTableBtn = document.querySelector(".clearTable");
    clearTableBtn.addEventListener("click", (e) => {
      clearTable(e);
    });

    pubSub.subscribe("customers", (c) => {
      customerInfoModalContent(c);
    });

    function customerInfoModalContent(customers) {
      let body = document.querySelector(".modal-customer-body");
      console.log(customers);
      let c = customers.customers;
      c.forEach((i) => {
        let h4 = document.createElement("h4");
        (h4.innerHTML = i.name), ":";
        let p = document.createElement("p");
        p.innerHTML = i.driverNotes;
        body.appendChild(h4).appendChild(p);
      });
    }

    function clearTable() {
      $("#tbody").empty();
    }
  });
}
