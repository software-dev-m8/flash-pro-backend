import {
    IsNumber,
    IsOptional,
    IsString,
    IsEnum,
    ValidateIf,
    IsDateString,
    IsBoolean,
    IsInt
  } from 'class-validator'
import { CouponType } from '@/shared/enums'
export class CreateCouponDto {
    @IsEnum(CouponType)
    public couponType: CouponType

    @ValidateIf((o) => o.couponType === CouponType.SomefoodType)
    @IsString()
    readonly foodName?: string

    @IsString()
    public restaurantBranch: string //format: dont know

    @IsOptional()
    @IsInt()
    @ValidateIf((o) => o.discountPercet > 0 && o.discountPercent <= 100)
    public discountPercent: number

    @IsOptional()
    @IsInt()
    @ValidateIf((o) => o.discountBaht >= 0)
    public discountBaht: number

    @IsBoolean()
    public branchOnly: boolean // is the coupon can use only for this branch?

    @IsNumber()
    @IsOptional()
    public amount: number

    @IsDateString()
    public startDate: string 

    @IsDateString()
    public endDate: string 

    @IsString()
    public couponImage: string
}
