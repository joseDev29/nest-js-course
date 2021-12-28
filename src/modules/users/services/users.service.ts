import { Injectable, NotFoundException } from '@nestjs/common'

import { generateID } from 'src/common/generateID'
import { ProductsService } from 'src/modules/products/services/products.service'
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto'
// import { Order } from '../entities/order.entity'
import { User } from '../entities/user.entity'

@Injectable()
export class UsersService {}
