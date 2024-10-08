import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Profile } from './schemas/profile.schema'
import { CreateProfileDto, UpdateProfileDto } from './dto'

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,

  ) {}

  // async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
  //   let profileData: any = {
  //     firstName: createProfileDto.firstName,
  //     lastName: createProfileDto.lastName,
  //     phoneNumber: createProfileDto.phoneNumber,
  //     birthDate: createProfileDto.birthDate,
  //   }

  //   if (createProfileDto.profileType === ProfileType.RESTAURANT) {
  //     if (!createProfileDto.restaurantName || !createProfileDto.address) {
  //       throw new HttpException(
  //         'RESTAURANT_NAME_AND_ADDRESS_ARE_REQUIRED',
  //         HttpStatus.BAD_REQUEST,
  //       )
  //     }
  //     profileData.restaurantName = createProfileDto.restaurantName
  //     profileData.address = createProfileDto.address
  //     // profileData.branches = createProfileDto.branches;
  //     return await this.restaurantProfileModel.create(profileData)
  //   }

  //   return await this.customerProfileModel.create(profileData)
  // }

  async findProfileById(id: string): Promise<Profile> {
    const profile = await this.profileModel.findById(id).exec()

    if (!profile) {
      throw new HttpException('PROFILE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return profile
  }

  async updateProfile(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const updatedProfile = await this.profileModel
      .findByIdAndUpdate(id, updateProfileDto, { new: true })
      .exec()

    if (!updatedProfile) {
      throw new HttpException('PROFILE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return updatedProfile
  }

  async deleteProfile(id: string): Promise<Profile> {
    const deletedProfile = await this.profileModel.findByIdAndDelete(id).exec()
    if (!deletedProfile) {
      throw new HttpException('PROFILE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return deletedProfile
  }

  // async findCustomerProfiles(): Promise<CustomerProfile[]> {
  //   const profiles = await this.profileModel
  //     .find({ profileType: ProfileType.CUSTOMER })
  //     .lean()
  //     .exec()
  //   return profiles as CustomerProfile[]
  // }

  // async findRestaurantProfiles(): Promise<RestaurantProfile[]> {
  //   const profiles = await this.profileModel
  //     .find({ profileType: ProfileType.RESTAURANT })
  //     .lean()
  //     .exec()
  //   return profiles as RestaurantProfile[]
  // }
}
