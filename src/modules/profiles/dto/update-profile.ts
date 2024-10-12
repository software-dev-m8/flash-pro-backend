import { PartialType } from '@nestjs/swagger'
import {
  CreateCustomerProfileDto,
  CreateRestaurantProfileDto,
} from './create-profile.dto'
import { IsArray, IsMongoId, IsOptional } from 'class-validator'

export class UpdateCustomerProfileDto extends PartialType(
  CreateCustomerProfileDto,
) {}

export class UpdateRestaurantProfileDto extends PartialType(
  CreateRestaurantProfileDto,
) {
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  branches?: string[]
}
