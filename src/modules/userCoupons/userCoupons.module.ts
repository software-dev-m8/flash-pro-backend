import { Module } from '@nestjs/common'
import { UserCouponsService } from './userCoupons.service'
import { UserCouponsController } from './userCoupons.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserCoupon, UserCouponSchema } from './schemas/userCoupon.schema'
import { Coupon , CouponSchema} from '../coupons/schemas/coupon.schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserCoupon.name, schema: UserCouponSchema },{ name: Coupon.name, schema: CouponSchema },]),
    ScheduleModule.forRoot(),
  ],
  providers: [UserCouponsService],
  controllers: [UserCouponsController],
  exports: [UserCouponsService],
})
export class UserCouponsModule {}
