export interface Geo {
  lat: string
  lng: string
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

/** Flattened user row for table display */
export interface UserListItem {
  id: number
  name: string
  email: string
  companyName: string
  city: string
  phone: string
  website: string
}
