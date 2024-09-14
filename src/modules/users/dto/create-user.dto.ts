import { Role } from '@/shared/enums'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
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
}
