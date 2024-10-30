import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @ApiProperty({
    description: 'The password with a minimum length of 8 characters',
    example: 'password123',
  })
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string
}
