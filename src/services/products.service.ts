import { Injectable } from '@nestjs/common'
import { CreateProductDTO, UpdateProductDTO } from 'src/dtos/products.dto'
import { Product, ProductPayload } from 'src/interfaces/products.interfaces'

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Macbook',
      price: 1200,
    },
    {
      id: '2',
      name: 'Iphone',
      price: 600,
    },
    {
      id: '3',
      name: 'Apple watch',
      price: 400,
    },
  ]

  findAll(): Product[] {
    return this.products
  }

  findOne(id: string): Product {
    return this.products.find((item) => item.id === id)
  }

  create(payload: CreateProductDTO): Product {
    const product = { id: `${this.products.length + 1}`, ...payload }

    this.products.push(product)

    return product
  }

  update(id: string, payload: UpdateProductDTO): Product | null {
    const index = this.products.findIndex((item) => item.id === id)
    let product = this.products[index]

    if (!product) return null

    product = {
      ...product,
      ...payload,
    }

    this.products[index] = product

    return product
  }

  delete(id: string): Product | null {
    const index = this.products.findIndex((item) => item.id === id)
    let product = this.products[index]

    if (!product) return null

    this.products.splice(index, 1)

    return product
  }
}
