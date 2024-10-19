import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateUserCouponDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  couponId: string;
}