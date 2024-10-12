import {
    IsNumber,
    IsOptional,
    IsString,
    IsEnum,
    ValidateIf,
    IsDateString,
    IsBoolean
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
