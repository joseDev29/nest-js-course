import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dto'

import { generateID } from '../../../common/generateID'
import { Product } from '../entities/product.entity'

@Injectable()
export class ProductsService {
  private products: Product[] = []

  findAll(): Product[] {
    return this.products
  }

  findOne(id: string): Product {
    return this.products.find((item) => item.id === id)
  }

  create(payload: CreateProductDTO): Product {
    const product: Product = { id: generateID(), ...payload }

    this.products.push(product)

    return product
  }

  update(id: string, payload: UpdateProductDTO): Product | null {
    const index = this.products.findIndex((item) => item.id === id)
    let product = this.products[index]

    if (!product)
      throw new NotFoundException(`Product with id '${id}' not found`)

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

    if (!product)
      throw new NotFoundException(`Product with id '${id}' not found`)

    this.products.splice(index, 1)

    return product
  }
}
