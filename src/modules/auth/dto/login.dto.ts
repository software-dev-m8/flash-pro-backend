import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  // @MinLength(8)
  @IsNotEmpty()
  readonly password: string
}
