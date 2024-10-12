import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator'

export class CreateCustomerProfileDto {
  @IsString()
  readonly firstName: string

  @IsString()
  readonly lastName: string

  @IsPhoneNumber('TH')
  @IsOptional()
  readonly phoneNumber?: string

  @IsDateString()
  @IsOptional()
  readonly birthDate?: string
}

export class CreateRestaurantProfileDto {
  @IsString()
  @IsNotEmpty()
  readonly restaurantName: string

  @IsString()
  @IsOptional()
  readonly address: string
}
