import { PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'
import { IsOptional } from 'class-validator'
import { Profile } from '@/modules/profiles/schemas/profile.schema'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  readonly refreshToken?: string

  @IsOptional()
  readonly profile?: Profile
}
