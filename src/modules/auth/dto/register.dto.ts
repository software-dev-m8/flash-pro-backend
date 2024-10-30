import { IsNotEmpty, IsString } from 'class-validator'
import { LoginDto } from './login.dto'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto extends LoginDto {
  @ApiProperty({
    description: 'Your first name',
    example: 'john',
  })
  @IsString()
  @IsNotEmpty()
  public firstName: string

  @ApiProperty({
    description: 'Your last name',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  public lastName: string
}
