import { PartialType } from '@nestjs/swagger';
import { CreateCouponDto } from './create-coupon.dto';
import { IsOptional } from 'class-validator';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}
