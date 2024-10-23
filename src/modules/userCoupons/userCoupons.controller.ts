import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCouponsService} from './userCoupons.service';
import { CreateUserCouponDto } from './dto';
import { ApiTags, ApiBody } from '@nestjs/swagger'

@ApiTags('UserCoupons')
@Controller('userCoupons')
export class UserCouponsController {
    constructor(private readonly userCouponsService: UserCouponsService) {}

    @Post()
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

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.userCouponsService.remove(id)
    }
}