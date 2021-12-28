import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductsModule } from '../products/products.module'
import { UsersController } from './controllers/users.controller'
import { Order, OrderSchema } from './entities/order.entity'
import { UsersService } from './services/users.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    ProductsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
