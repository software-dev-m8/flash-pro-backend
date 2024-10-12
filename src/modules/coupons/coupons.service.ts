import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Model } from 'mongoose'
import { Coupon } from './schemas/coupon.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateProfileDto } from '../profiles/dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectModel(Coupon.name)
    private readonly couponModel: Model<Coupon>,
  ){}

  async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    return await this.couponModel.create(createCouponDto);
  }

  async findAll(): Promise<Coupon[]> {
    return this.couponModel.find();
  }

  async findByCouponId(id: string): Promise<Coupon> {
    const coupon = await this.couponModel.findById(id).exec()

    if (!coupon) {
      throw new HttpException('COUPON_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return coupon;
  }
  
  async findByText(text: string): Promise<Coupon[]> {
    const regex = new RegExp(text, 'i');
    const couponList = await this.couponModel.find({ foodName : { $regex: regex } }).exec()
    if (!couponList) {
      throw new HttpException('COUPONLIST_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return couponList;

  }

  async findByBranch(text: string): Promise<Coupon[]> {
    const regex = new RegExp(text, 'i');
    const couponList = await this.couponModel.find({ restaurantBranch : { $regex: regex } }).exec()
    if (!couponList) {
      throw new HttpException('COUPONLIST_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return couponList;

  }

  async update(id: string, updateCouponDto: UpdateCouponDto): Promise<Coupon>{
    const coupon = await this.findByCouponId(id)

    if(!coupon) {
      throw new HttpException('COUPON_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    const updatedCoupon = await this.couponModel.findByIdAndUpdate(id, updateCouponDto, { new: true }).exec()
    return updatedCoupon
  }

  async remove(id: string): Promise<Coupon>{
    const deletedCoupon = await this.couponModel.findByIdAndDelete(id).exec()

    if (!deletedCoupon) {
      throw new HttpException('Coupon_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return deletedCoupon
  }
}
