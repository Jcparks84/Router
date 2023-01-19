// // This file gets all routes, either saved or inputed from forms and displays them.

// import { CustomerProps, RouteProps } from "./interface";
// import { pubSub } from "./pubSub.js";

// console.log("Route Wired");

// export function Route() {
//   let routes: RouteProps[] = [];
//   let route: RouteProps = {
//     name: "",
//     customers: [],
//   };

//   pubSub.subscribe("route", (r: RouteProps) => {
//     route.name = r.name;
//   });

//   pubSub.subscribe("addedCustomer", (c: CustomerProps) => {
//     route.customers?.push(c);
//   });

//   routes.push(route);
//   pubSub.publish("allRoutes", routes);

//   let exportBtn = document.querySelector(".export")!;
//   exportBtn.addEventListener("click", (e) => {
//   });
//   exportBtn.dispatchEvent(new Event("click"))

//   //   // Import Routes

//   fetch("../libraries/routes.json")
//     .then((r) => r.json())
//     .then((data) => routes.push(...data));

//   const openImportModal = document.querySelectorAll("[data-modal-target]");
//   const closeImportModal = document.querySelectorAll("[data-close-button]");
//   const importOverlay = document.getElementById("import-overlay")!;

//   openImportModal.forEach((button: any) => {
//     button.addEventListener("click", () => {
//       const importModal = document.querySelector(
//         button.dataset.modalTarget
//       ) as HTMLButtonElement;
//       openModal(importModal);
//       modalImportContent();
//     });
//   });

//   closeImportModal.forEach((button: any) => {
//     button.addEventListener("click", () => {
//       const importModal = button.closest(".modal-import");
//       closeModal(importModal);
//     });
//   });

//   function openModal(importModal: Element) {
//     if (importModal === null) return;
//     importModal.classList.add("active");
//     importOverlay.classList.add("active");
//   }

//   function closeModal(importModal: Element) {
//     if (importModal === null) return;
//     importModal.classList.remove("active");
//     importOverlay.classList.remove("active");
//   }

//   ///////////////////////Add Routes To Modal////////////////////////////////////

//   const modalul = document.querySelector(".ul-modal-route")!;

//   function modalImportContent() {
//     routes.forEach((r) => {        
//       let li = document.createElement("li");
//       li.classList.add("modal-route");
//       let a = document.createElement("a");
//       a.innerText = r.name!;
//       a.href = "#route-display";
//       modalul
//         .appendChild(li)
//         .appendChild(a)
//         .addEventListener("click", (e: Event) => {
//         const target = e.target as HTMLButtonElement
//           route.name = target.textContent!  //CHECK
//           addRouteName(route);
//         });
//     });
//   }

//   // Clear Modal content... Added to close modal

//   function clearModalContent() {
//     modalul.innerHTML = " ";
//   }

//   //   // Add Route Name to HTML

//     function addRouteName(r: RouteProps) {
//       let routeNameHtml = document.querySelector(".route-span")!;
//       routeNameHtml.innerHTML = r.name!;
//       getCustomers(r);
//     }

//     function getCustomers(r: RouteProps,) {
//       for (let i = 0; i < routes.length; i++) {
//         if (routes[i].name === r.name) {
//           let selectedRoute = routes[i];
//           pubSub.publish("selectedRoute", selectedRoute);
//           let customers: CustomerProps[] | undefined = routes[i].customers;
//           console.log(customers);
          
//           addCustomersToTable(customers);
//           pubSub.publish("customers", { customers });
//         }
//       }
//     }

//     // Add Customers to HTML Table

//     function addCustomersToTable(customers: CustomerProps[] | undefined) {
//         console.log("CUSTOMERS", customers);
        
//         //   let newData = customers
//         let newData:string = customers!
//         .map(
//             (c, i:number) => 
//                                             `<tr key=${i}>
//                                             <td>${i + 1}</td>
//                                             <td>${c.name}</td>
//                                             <td> ${Object.values(c.address!).join(
//                                                 ","
//                                                 )}</td>          
//                                             <td>${c.phone}</td>
//                                             <td>${c.key}</td>
//                                             <td>${c.cases}</td>
//                                             <td style="display: none" >${
//                                                 c.driverNotes
//                                               }</td>
//                                             </tr>`
//         )
//         .join("");
//         let tbody = document.querySelector(".tbody")!
//       tbody.innerHTML = newData;
//       getImportTotalCases(customers);
//     }


//     let clearTableBtn = document.querySelector(".clearTable")!;
//     clearTableBtn.addEventListener("click", () => {
//       clearTable();
//     });
//     function clearTable() {
//       $("#tbody").empty();
//     }

//     function getImportTotalCases(customers: CustomerProps[] | undefined) {
//       let casesHTML = document.querySelector(".cases-span");
//       let cases = customers!.map(({ cases }) => {        
//         return parseInt(cases, 10);
//       });
//       let totalCases = cases.reduce(function (a, b) {
//         return a + b;
//       }, 0);
//       console.log();
      
//       casesHTML.innerHTML = totalCases.toString();
//     }

//     /////////////////////////////////// StopInfo Modal //////////////////////////////////

//     // const openCustomerModal = document.querySelectorAll(
//     //   "[data-customer-modal-target]"
//     // );
//     // const closeCustomerModal = document.querySelectorAll("[data-close-button]");

//     // openCustomerModal.forEach((button) => {
//     //   button.addEventListener("click", () => {
//     //     const CustomerModal = document.querySelector(
//     //       button.dataset.customerModalTarget
//     //     );
//     //     openModal(CustomerModal);
//     //   });
//     // });

//     // closeCustomerModal.forEach((button) => {
//     //   button.addEventListener("click", () => {
//     //     clearModalContent();
//     //     const CustomerModal = button.closest(".modal-customer");
//     //     closeModal(CustomerModal);
//     //   });
//     // });

//     // Clear Table


//     // pubSub.subscribe("customers", (r:CustomerProps[]) => {
//     //   customerInfoModalContent(c);
//     // });

//     // function customerInfoModalContent(r: RouteProps) {
//     //   let body = document.querySelector(".modal-customer-body")!;
//     //   let c = r.customers;
//     //   c.forEach((i: string) => {
//     //     let h4 = document.createElement("h4");
//     //     (h4.innerHTML = i.name), ":";
//     //     let p = document.createElement("p");
//     //     p.innerHTML = i.driverNotes;
//     //     body.appendChild(h4).appendChild(p);
//     //   });
//     // }

// }
