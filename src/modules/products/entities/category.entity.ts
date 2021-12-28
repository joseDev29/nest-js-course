import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
  timestamps: true,
})
export class Category extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  name: string

  @Prop({ required: true })
  image: string
}

//El Schema debe ser importado en el modulo en el cual va a ser utilizado mediante MoongoseModule.forFeature
export const CategorySchema = SchemaFactory.createForClass(Category)
