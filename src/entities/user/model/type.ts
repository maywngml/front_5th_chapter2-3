export interface User {
  id: number
  username: string
  fullName: string
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface Address {
  address: string
  city: string
  coordinates: Coordinates
  country: string
  postalCode: string
  state: string
  stateCode: string
}

export interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export interface Company {
  address: Address
  department: string
  name: string
  title: string
}

export interface Hair {
  color: string
  type: string
}

export interface Crypto {
  coin: string
  wallet: string
  network: string
}
export interface GetUserResponse {
  id: number
  address: Address
  age: number
  bank: Bank
  birthDate: string
  bloodGroup: string
  company: Company
  crypto: Crypto
  ein: string
  email: string
  eyeColor: string
  firstName: string
  gender: string
  hair: Hair
  height: number
  image: string
  ip: string
  lastName: string
  macAddress: string
  maidenName: string
  phone: string
  role: string
  ssn: string
  university: string
  userAgent: string
  username: string
  weight: number
}

export type UserWithoutFullName = Omit<User, "fullName"> & {
  image: string
}

export interface GetUsersResponse {
  limit: number
  skip: number
  total: number
  users: UserWithoutFullName[]
}
