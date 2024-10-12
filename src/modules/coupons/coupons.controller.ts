import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto, UpdateCouponDto } from './dto';
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
        couponType: { type: 'CouponType', example: 'somefood'},
        foodName: {type: 'string', example: 'fried chicken'},
        restaurantBranch: {type: 'string', example: 'dont know'},
        branchOnly: {type: 'boolean', example: true },
        amount: { type: 'number', example: 300 },
        startDate: { type: 'string',example: '2024-10-12'},
        endDate : { type: 'string',example: '2024-10-20'},
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

  @Get('search/restaurantbranch/:text')
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
