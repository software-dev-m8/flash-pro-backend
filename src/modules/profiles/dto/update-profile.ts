import { PartialType } from '@nestjs/swagger'
import {
  CreateCustomerProfileDto,
  CreateRestaurantProfileDto,
} from './create-profile.dto'

export class UpdateCustomerProfileDto extends PartialType(CreateCustomerProfileDto) {}

export class UpdateRestaurantProfileDto extends PartialType(
  CreateRestaurantProfileDto,
) {}
