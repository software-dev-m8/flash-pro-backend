import {
  IsDateString,
  IsOptional,
  IsPhoneNumber,
  IsString,
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
}
