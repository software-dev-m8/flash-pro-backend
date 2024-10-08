import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true, discriminatorKey: 'type' })
export class Profile extends Document {
  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop()
  phoneNumber?: string

  @Prop({ type: Date })
  birthDate?: Date
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)
