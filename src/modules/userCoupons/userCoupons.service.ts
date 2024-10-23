import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserCouponDto } from './dto';
import { Model } from 'mongoose'
import { UserCoupon } from './schemas/userCoupon.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CouponsService } from '../coupons/coupons.service';
// import { UsersService } from '../users/users.service';

@Injectable()
export class UserCouponsService {
  constructor(
    @InjectModel(UserCoupon.name)
    private readonly userCouponModel: Model<UserCoupon>,
  ){}

  async createUserCoupon(createUserCouponDto: CreateUserCouponDto): Promise<UserCoupon>{
    const userCouponList = await this.userCouponModel.find({ userId : createUserCouponDto.userId }).exec()
    let isCollect = false
    for (const coupon of userCouponList) {
        if(coupon.couponId.toString() === createUserCouponDto.couponId) {
            isCollect = true
            break
        }
      }

    if (!isCollect){
        const newUserCoupon = await this.userCouponModel.create({
            couponId : createUserCouponDto.couponId,
            userId : createUserCouponDto.userId,
        })
        return newUserCoupon
    }
    else {
        throw new HttpException('Coupon_is_Aready_Corrected', HttpStatus.BAD_REQUEST)
    }
  }

  async findByUserCouponId(id: string): Promise<UserCoupon> {
    const userCoupon = await this.userCouponModel.findById(id).exec()

    if (!userCoupon) {
      throw new HttpException('Coupon_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return userCoupon;
  }

  async remove(id: string): Promise<UserCoupon>{
    const deletedUserCoupon = await this.userCouponModel.findByIdAndDelete(id).exec()

    if (!deletedUserCoupon) {
      throw new HttpException('Coupon_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return deletedUserCoupon
  }

  async getRemainingTime(id: string): Promise<number> {
    const userCoupon = await this.userCouponModel.findById(id).exec()

    if (!userCoupon) {
      throw new HttpException('Coupon_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    const now = new Date();
    const expirationTime = new Date(userCoupon.collectAt.getTime() + 2 * 60 * 60 * 1000); // 2 hours

    const remainingTime = expirationTime.getTime() - now.getTime();

    return Math.max(0, Math.floor(remainingTime / 1000));
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async removeExpiredCoupons() {
    const now = new Date();
    const expiredCoupons = await this.userCouponModel.find({
      collectAt: { $lt: new Date(now.getTime() - 2 * 60 * 60 * 1000) }, // 2 hours ago
      isUsed: false,
    });

    for (const coupon of expiredCoupons) {
      await this.remove(coupon._id.toString());
    }

    console.log('Expired coupons remove');
  }
}
