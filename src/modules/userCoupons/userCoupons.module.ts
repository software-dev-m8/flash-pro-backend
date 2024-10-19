import { Module } from '@nestjs/common'
import { UserCouponsService } from './userCoupons.service'
import { UserCouponsController } from './userCoupons.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserCoupon, UserCouponSchema } from './schemas/userCoupon.schema'
import { ProfilesModule } from '../profiles/profiles.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserCoupon.name, schema: UserCouponSchema }]),
    ProfilesModule,
  ],
  providers: [UserCouponsService],
  controllers: [UserCouponsController],
  exports: [UserCouponsService],
})
export class UserCouponsModule {}
