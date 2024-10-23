import { Role } from '@/shared/enums'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

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

  @Prop({ type: Types.ObjectId, refPath: 'profileModel' })
  profile: Types.ObjectId

  @Prop({ required: true, enum: ['CustomerProfile', 'RestaurantProfile'] })
  profileModel: string
}

export const UserSchema = SchemaFactory.createForClass(User)
