import {
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator'
export class CreateCouponDto {
    @IsString()
    public couponName: string

    @IsString()
    public branch: string

    @IsNumber()
    @IsOptional()
    public amount: number

    @IsString()
    public couponImage: string
}
