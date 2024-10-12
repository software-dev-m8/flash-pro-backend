import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator'

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  branchName: string

  @IsString()
  @IsNotEmpty()
  address: string

  @IsPhoneNumber('TH')
  @IsOptional()
  phoneNumber?: string
}
