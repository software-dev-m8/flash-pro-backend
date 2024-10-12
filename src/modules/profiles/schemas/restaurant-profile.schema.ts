import { Branch } from '@/modules/branches/schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

@Schema({ timestamps: true })
export class RestaurantProfile extends Document {
  @Prop({ required: true })
  restaurantName: string

  @Prop()
  image?: string

  @Prop()
  branches: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Branch' }]
}

export const RestaurantProfileSchema =
  SchemaFactory.createForClass(RestaurantProfile)
