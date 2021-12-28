import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Skill, SkillSchema } from './skill.entity'

@Schema({
  timestamps: true,
})
export class Customer extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true })
  phone: string

  //Relacion de uno a muchos embebida
  // @Prop({
  //   type: [
  //     {
  //       name: { type: String },
  //       color: { type: String },
  //     },
  //   ],
  // })
  @Prop({ type: [SkillSchema] })
  // skills: Types.Array<Record<string, any>>
  skills: Types.Array<Skill>
  //De esta misma forma se pueden tipar relaciones embebidas 1:1
}

//El Schema debe ser importado en el modulo en el cual va a ser utilizado mediante MoongoseModule.forFeature
export const CustomerSchema = SchemaFactory.createForClass(Customer)
