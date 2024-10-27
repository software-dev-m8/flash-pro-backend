import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class UserCoupon extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  couponId: Types.ObjectId

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId

  @Prop({ default: false })
  isUsed: boolean

  @Prop({ default: Date.now })
  collectAt: Date;

  @Prop({nullable: true })
  usedAt: Date;

  @Prop({ nullable: true })
  expiredAt: Date;

}

export const UserCouponSchema = SchemaFactory.createForClass(UserCoupon)