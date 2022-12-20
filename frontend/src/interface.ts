export interface RouteProps {
    name: string,
    customers: CustomerProps[]
}

export interface CustomerProps{
    name?: string,
    address?: AddressProps,
    phone?: string,
    key?: string,
    cases: string,
    driverNotes?: string,
}

export interface LocationProps {
    city: string,
    state: string
}

export interface AddressProps{
    street: string,
    city: string,
    state: string,
    zip: string,
  }


// export interface RouteProps {
//     name: Observable<string>,
//     customers: CustomerProps[]
// }

// export interface CustomerProps {
//     name: Observable<string>,
//     address: {
//       street: Observable<string>,
//       city: Observable<string>,
//       state: Observable<string>,
//       zip: Observable<string>,
//     },
//     phone: Observable<string>,
//     key: Observable<string>,
//     cases: Observable<string>,
//     driverNotes: Observable<string>,
// }