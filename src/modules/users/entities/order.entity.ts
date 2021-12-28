import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Product } from 'src/modules/products/entities/product.entity'
import { Customer } from './costumer.entity'

export class Order extends Document {
  @Prop({ type: Date, required: true })
  date: Date

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Product>
}

export const OrderSchema = SchemaFactory.createForClass(Order)
