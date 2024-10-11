import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Coupon extends Document{
    @Prop({ required: true})
    couponName: string

    @Prop({ required: true })
    branch: string

    @Prop({required: false, default: null})
    amount: number //number of coupons that all users see (how many coupons are left)

    @Prop()
    couponImage : string
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);