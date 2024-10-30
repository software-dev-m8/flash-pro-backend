import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator'

export class CreateBranchDto {
  @ApiProperty({
    description: 'The name of the branch',
    example: 'Central Plaza Branch',
  })
  @IsString()
  @IsNotEmpty()
  branchName: string

  @ApiProperty({
    description: 'The address of the branch',
    example: '1234 Main St, Bangkok, Thailand',
  })
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiPropertyOptional({
    description: 'The phone number of the branch',
    example: '+66812345678',
  })
  @IsPhoneNumber('TH')
  @IsOptional()
  phoneNumber?: string
}
