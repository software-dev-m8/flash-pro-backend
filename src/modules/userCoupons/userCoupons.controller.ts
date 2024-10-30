import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCouponsService} from './userCoupons.service';
import { CreateUserCouponDto } from './dto';
import { ApiTags, ApiBody } from '@nestjs/swagger'

@ApiTags('UserCoupons')
@Controller('userCoupons')
export class UserCouponsController {
    constructor(private readonly userCouponsService: UserCouponsService) {}

    @Post('collectCoupon')
    createUseCoupons(@Body() createUserCouponDto: CreateUserCouponDto) {
        return this.userCouponsService.createUserCoupon(createUserCouponDto)
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.userCouponsService.findByUserCouponId(id);
    }

    @Get('/remainingTime/:id')
    getRemainingTime(@Param('id') id: string){
        return this.userCouponsService.getRemainingTime(id);
    }

    @Get('/byUser/:id')
    findByUserId(@Param('id') id: string) {
        return this.userCouponsService.findByUserId(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.userCouponsService.remove(id)
    }

    @Post('useCoupon/:id')
    useCoupon(@Param('id') id: string){
        return this.userCouponsService.useCoupon(id)
    }
}