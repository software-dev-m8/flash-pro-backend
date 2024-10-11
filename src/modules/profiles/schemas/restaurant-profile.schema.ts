import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

@Schema({ timestamps: true })
export class RestaurantProfile extends Document {
  @Prop({ required: true })
  restaurantName: string

  @Prop({ required: true })
  address: string

  @Prop()
  image?: string

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' })
  //   branches: Branch[]
}

export const RestaurantProfileSchema =
  SchemaFactory.createForClass(RestaurantProfile)
