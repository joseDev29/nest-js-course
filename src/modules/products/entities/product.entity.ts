import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document, ObjectId, Types } from 'mongoose'
import { Brand } from './brand.entity'

@Schema({
  timestamps: true,
})
export class Product extends Document {
  @Prop({
    required: true,
  })
  name: string

  @Prop({
    default: 'No description',
  })
  description: string

  @Prop({
    type: Number,
    //Indexa esta propiedad en la base de datos
    //index: true,
    required: true,
  })
  price: number

  @Prop({
    required: true,
    type: Number,
  })
  stock: number

  @Prop({
    required: true,
  })
  image: string

  //Relacion embebida mediante subdocumentos
  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>

  //Relacion referencial
  @Prop({
    type: Types.ObjectId,
    //Brand.name hace referencia al nombre de la entidad, no al campo name del Brand
    ref: Brand.name,
  })
  brand: Brand | Types.ObjectId
}

//El Schema debe ser importado en el modulo en el cual va a ser utilizado mediante MoongoseModule.forFeature
export const ProductSchema = SchemaFactory.createForClass(Product)
ProductSchema.index({
  //Indexado de forma ascendente
  price: 1,
  //Indexado de forma descendente
  stock: -1,
})
