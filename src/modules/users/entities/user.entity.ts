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
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  role: string
}

//El Schema debe ser importado en el modulo en el cual va a ser utilizado mediante MoongoseModule.forFeature
export const UserSchema = SchemaFactory.createForClass(User)

//Removemos la propiedad password cada que el usuario
//se retorne en una response
UserSchema.methods.toJSON = function () {
  const { password, ...user } = this.toObject()

  return user
}

// UserSchema.pre('save', async function (next: HookNextFunction) {
//   const user = this as User;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();

//   // Random additional data
//   const salt = await bcrypt.genSalt(10);

//   const hash = await bcrypt.hash(user.password, salt);

//   // Replace the password with the hash
//   user.password = hash;

//   return next();
// });
