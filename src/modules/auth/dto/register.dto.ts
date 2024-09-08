import { IsNotEmpty, IsString } from 'class-validator'
import { LoginDto } from './login.dto'

export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string

  @IsString()
  @IsNotEmpty()
  public lastName: string
}
