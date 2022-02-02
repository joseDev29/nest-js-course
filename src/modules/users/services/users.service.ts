import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'

import { generateID } from 'src/common/generateID'
import { ProductsService } from 'src/modules/products/services/products.service'
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto'
// import { Order } from '../entities/order.entity'
import { User } from '../entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(payload: CreateUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(payload.password, 10)

    const userData = {
      ...payload,
      password: hashedPassword,
    }

    const user = new this.userModel(userData)

    return await user.save()
  }
}
