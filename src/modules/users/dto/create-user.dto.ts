import {
  CreateCustomerProfileDto,
  CreateRestaurantProfileDto,
} from '@/modules/profiles/dto'
import { Role } from '@/shared/enums'
import { Type } from 'class-transformer'

import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsEmail()
  public email: string

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  public password: string

  @IsEnum(Role)
  @IsOptional()
  public role?: Role

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCustomerProfileDto)
  customerProfile?: CreateCustomerProfileDto

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateRestaurantProfileDto)
  restaurantProfile?: CreateRestaurantProfileDto
}
