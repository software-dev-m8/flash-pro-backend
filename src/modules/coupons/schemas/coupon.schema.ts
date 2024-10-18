import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import { CouponType } from '@/shared/enums'


@Schema({ timestamps: true })
export class Coupon extends Document{
    @Prop({ required: true})
    couponType: CouponType

    @Prop({required: false, default: null})
    foodName: string

    @Prop({ required: true })
    restaurantBranch: string

    @Prop({ required : false})
    discountPercent: number

    @Prop({required : false})
    discountBaht: number

    @Prop({ required : true})
    branchOnly: boolean // is the coupon can use only for this branch?

    @Prop({required: false, default: null})
    amount: number //number of coupons that all users see (how many coupons are left)
    
    @Prop({required: true})
    startDate: string

    @Prop({required: true})
    endDate: string

    @Prop()
    couponImage : string

    @Prop()
    couponDetails : string
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);