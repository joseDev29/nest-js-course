import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  name: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  role: string
}

//El Schema debe ser importado en el modulo en el cual va a ser utilizado mediante MoongoseModule.forFeature
export const UserSchema = SchemaFactory.createForClass(User)
