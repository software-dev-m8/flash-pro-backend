import { Role } from '@/shared/enums'

import {
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidateIf,
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

  // @IsString()
  // public firstName: string

  // @IsString()
  // public lastName: string

  // @IsPhoneNumber('TH')
  // public phoneNumber: string

  // @IsDateString()
  // @IsOptional()
  // readonly birthDate?: string

  // @IsEnum(ProfileType)
  // readonly profileType: ProfileType

  // @ValidateIf((o) => o.profileType === ProfileType.RESTAURANT)
  // @IsString()
  // readonly restaurantName?: string

  // @ValidateIf((o) => o.profileType === ProfileType.RESTAURANT)
  // @IsString()
  // readonly address?: string

  // @ValidateIf((o) => o.profileType === ProfileType.RESTAURANT)
  // @IsArray()
  // @IsString({ each: true })
  // @IsOptional()
  // readonly branches?: string[]
}
