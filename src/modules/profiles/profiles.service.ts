import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Profile } from './schemas/profile.schema'
import { CreateProfileDto, UpdateProfileDto } from './dto'

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {}

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    return await this.profileModel.create(createProfileDto)
  }

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
}
