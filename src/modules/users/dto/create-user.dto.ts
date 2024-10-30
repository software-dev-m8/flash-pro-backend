import {
  CreateCustomerProfileDto,
  CreateRestaurantProfileDto,
} from '@/modules/profiles/dto'
import { Role } from '@/shared/enums'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
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
  @ApiProperty({
    description: 'Email',
    example: 'user@example.com',
  })
  @IsString()
  @IsEmail()
  public email: string

  @ApiProperty({
    description: 'The password with a minimum length of 8 characters',
    example: 'password123',
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  public password: string

  @ApiPropertyOptional({
    description:
      'The role assigned to the user, if not assigned will be user for customer',
    example: 'restaurant',
    enum: Role,
  })
  @IsEnum(Role)
  @IsOptional()
  public role?: Role

  @ApiPropertyOptional({
    description:
      'The customer profile information, if applicable. Choose only 1 type',
    type: CreateCustomerProfileDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCustomerProfileDto)
  customerProfile?: CreateCustomerProfileDto

  @ApiPropertyOptional({
    description:
      'The restaurant profile information, if applicable. Choose only 1 type',
    type: CreateRestaurantProfileDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateRestaurantProfileDto)
  restaurantProfile?: CreateRestaurantProfileDto
}
