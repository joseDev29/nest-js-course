import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { Order } from '../entities/order.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderModel
      .find()
      .populate('custumer')
      .populate('products')
      .exec()
  }

  async removeProduct(id: ObjectId, productId: ObjectId): Promise<Order> {
    const order = await this.orderModel.findById(id).exec()

    //Removemos el productId enviado de la lista de products
    order.products.pull(productId)
    return order.save()
  }

  async addProducts(id: ObjectId, productIds: ObjectId[]) {
    const order = await this.orderModel.findById(id).exec()

    //Agregamos el array de productId a la lista de products
    order.products.push(...productIds)
    return order.save()
  }
}
