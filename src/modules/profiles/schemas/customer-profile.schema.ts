import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class CustomerProfile extends Document {
  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop()
  phoneNumber?: string

  @Prop({ type: Date })
  birthDate?: Date

  @Prop()
  image?: string
}

export const CustomerProfileSchema =
  SchemaFactory.createForClass(CustomerProfile)
