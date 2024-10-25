import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserCouponDto } from './dto';
import { Model } from 'mongoose'
import { UserCoupon } from './schemas/userCoupon.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as QRCode from 'qrcode';

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
        throw new HttpException('Coupon_is_Already_Collected', HttpStatus.BAD_REQUEST)
    }
  }

  async findByUserCouponId(id: string): Promise<UserCoupon> {
    const userCoupon = await this.userCouponModel.findById(id).exec()

    if (!userCoupon) {
      throw new HttpException('Coupon_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return userCoupon;
  }

  async findByUserId(id: string): Promise<UserCoupon[]> {
    console.log('Running removeExpiredCoupons...');
    const userCoupon = await this.userCouponModel.find({ userId : id }).exec()
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

    if (!userCoupon.isUsed) {
        const now = new Date();
        const expirationTime = new Date(userCoupon.collectAt.getTime() + 2  * 60 * 1000); // 2 hours

        const remainingTime = expirationTime.getTime() - now.getTime();
        return Math.max(0, Math.floor(remainingTime / 1000));
    }

    else {
        const now = new Date();
        const remainingTime = userCoupon.expiresAt.getTime() - now.getTime();
        return Math.max(0, Math.floor(remainingTime / 1000));
    }
    
  }

  async useCoupon(id: string): Promise<string> {
    const userCoupon = await this.userCouponModel.findById(id).exec()

    if (!userCoupon) {
      throw new HttpException('Coupon_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    if (userCoupon.expiresAt && userCoupon.expiresAt < new Date()) {
        throw new HttpException('Coupon_has_expired', HttpStatus.BAD_REQUEST)
    }

    if(!userCoupon.isUsed) {
        const usedAt = new Date();
        const expiresAt = new Date(usedAt.getTime() + 5 * 60 * 1000);
        await this.userCouponModel.findByIdAndUpdate(id,{
            isUsed: true,
            usedAt,
            expiresAt,})

        try {
            // Generate QR code as a Data URL (base64 image)
            const qrCode = await QRCode.toDataURL(this.generateCouponCode());
            return qrCode;
        } catch (error) {
            throw new HttpException('CANNOT_GENERATE_QR_CODE', HttpStatus.BAD_REQUEST)
        }
    }
    throw new HttpException('Coupon_Already_Used', HttpStatus.BAD_REQUEST)
  }

  private generateCouponCode(): string {
    return Math.random().toString(36).substring(2, 12).toUpperCase();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async removeExpiredCoupons() {
    const coupons = await this.userCouponModel.find({ isUsed: false })
    
    for (const coupon of coupons) {
        const now = new Date();
        const expirationTime = new Date(coupon.collectAt.getTime() + 2  * 60 * 1000);
        if (expirationTime < now){
            await this.remove(coupon._id.toString());
        }
    }
  }
}
