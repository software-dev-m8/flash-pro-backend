import { Profile } from '@/modules/profiles/schemas/profile.schema'
import { Role } from '@/shared/enums'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ default: Role.CUSTOMER })
  role: Role

  @Prop({})
  refreshToken: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile
}

export const UserSchema = SchemaFactory.createForClass(User)
