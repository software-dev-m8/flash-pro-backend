import { ProfileType } from '@/shared/enums'
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
} from 'class-validator'

export class CreateProfileDto {
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

  @IsEnum(ProfileType)
  readonly profileType: ProfileType

  @ValidateIf((o) => o.profileType === ProfileType.RESTAURANT)
  @IsString()
  readonly restaurantName?: string

  @ValidateIf((o) => o.profileType === ProfileType.RESTAURANT)
  @IsString()
  readonly address?: string
}
