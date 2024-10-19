import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCouponsService} from './userCoupons.service';
import { CreateUserCouponDto } from './dto';
import { ApiTags, ApiBody } from '@nestjs/swagger'

@ApiTags('UserCoupons')
@Controller('userCoupons')
export class UserCouponsController {
}