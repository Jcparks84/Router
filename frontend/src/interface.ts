export interface RouteProps {
    name: string,
    customers: CustomerProps[]
}

export interface CustomerProps {
    name: string,
    address: {
      street: string,
      city: string,
      state: string,
      zip: string,
    },
    phone: string,
    key: string,
    cases: string,
    driverNotes: string,
}