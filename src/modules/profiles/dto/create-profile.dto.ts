import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
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
  @ApiProperty({
    description: 'Your first name',
    example: 'john',
  })
  @IsString()
  readonly firstName: string

  @ApiProperty({
    description: 'Your last name',
    example: 'Doe',
  })
  @IsString()
  readonly lastName: string

  @ApiPropertyOptional({
    description: "The customer's phone number",
    example: '+66812345678',
  })
  @IsPhoneNumber('TH')
  @IsOptional()
  readonly phoneNumber?: string

  @ApiPropertyOptional({
    description: "The customer's date of birth in ISO format",
    example: '1990-01-01',
  })
  @IsDateString()
  @IsOptional()
  readonly birthDate?: string
}

export class CreateRestaurantProfileDto {
  @ApiProperty({
    description: 'The name of the restaurant',
    example: 'Hiso fries chicken',
  })
  @IsString()
  @IsNotEmpty()
  readonly restaurantName: string

  @ApiPropertyOptional({
    description: 'The address of the restaurant',
    example: '1234 Thai Street, Bangkok, Thailand',
  })
  @IsString()
  @IsOptional()
  readonly address: string
}
