import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Branch extends Document {
  @Prop({ required: true })
  branchName: string

  @Prop({ required: true })
  address: string

  @Prop()
  phoneNumber?: string
}

export const BranchSchema = SchemaFactory.createForClass(Branch)
