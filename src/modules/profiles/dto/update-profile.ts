import { PartialType } from '@nestjs/swagger'
import { CreateProfileDto } from './create-profile.dto'
import { IsOptional, IsString, ValidateIf } from 'class-validator'
import { ProfileType } from '@/shared/enums'

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ValidateIf((o) => o.profileType === ProfileType.RESTAURANT)
  @IsString({ each: true })
  @IsOptional()
  readonly branches?: string[]
}
