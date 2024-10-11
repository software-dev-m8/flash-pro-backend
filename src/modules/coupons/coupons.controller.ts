import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger'

@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  @ApiBody({
    description: 'Create a new coupon',
    schema: {
      type: 'object',
      properties: {
        couponName: { type: 'string', example: 'friedchickenKFC50off'},
        branch: {type: 'string', example: 'Minburi, Bangkok'},
        amount: { type: 'number', example: 300 },
        couponImage: {type: 'string', example: 'Link'},
      },
    },
  })
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.couponsService.findByCouponId(id);
  }

  @Get('search/name/:text')
  findByText(@Param('text') text: string) {
    return this.couponsService.findByText(text);
  }

  @Get('search/branch/:text')
  findByBranch(@Param('text') text: string) {
    return this.couponsService.findByBranch(text);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(id);
  }
}
