import { ID } from './general.interfaces'

export interface Product extends ID {
  name: string
  price: number
}

export interface ProductPayload {
  name: string
  price: number
}
