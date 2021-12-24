import { Injectable, NotFoundException } from '@nestjs/common'

import { generateID } from 'src/common/generateID'
import { ProductsService } from 'src/modules/products/services/products.service'
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto'
import { Order } from '../entities/order.entity'
import { User } from '../entities/user.entity'

@Injectable()
export class UsersService {
  private users: User[] = []

  constructor(private productsService: ProductsService) {}

  findAll(): User[] {
    return this.users
  }

  findOne(id: string): User {
    return this.users.find((item) => item.id === id)
  }

  create(payload: CreateUserDTO): User {
    const user: User = { id: generateID(), ...payload }

    this.users.push(user)

    return user
  }

  update(id: string, payload: UpdateUserDTO): User | null {
    const index = this.users.findIndex((item) => item.id === id)
    let user = this.users[index]

    if (!user) throw new NotFoundException(`User with id '${id}' not found`)

    user = {
      ...user,
      ...payload,
    }

    this.users[index] = user

    return user
  }

  delete(id: string): User | null {
    const index = this.users.findIndex((item) => item.id === id)
    let user = this.users[index]

    if (!user) throw new NotFoundException(`User with id '${id}' not found`)

    this.users.splice(index, 1)

    return user
  }

  findOrdersByUser(id: string): Order[] {
    const user = this.findOne(id)

    if (!user) throw new NotFoundException(`User with id '${id}' not found`)

    return [
      {
        user,
        date: new Date(),
        products: this.productsService.findAll(),
      },
    ]
  }
}
