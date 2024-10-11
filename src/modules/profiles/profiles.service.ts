import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CustomerProfile, RestaurantProfile } from './schemas'
import {
  CreateCustomerProfileDto,
  CreateRestaurantProfileDto,
  UpdateCustomerProfileDto,
  UpdateRestaurantProfileDto,
} from './dto'

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(CustomerProfile.name)
    private readonly customerProfileModel: Model<CustomerProfile>,
    @InjectModel(RestaurantProfile.name)
    private readonly restaurantProfileModel: Model<RestaurantProfile>,
  ) {}

  async findCustomerProfileById(id: string): Promise<CustomerProfile> {
    const profile = await this.customerProfileModel.findById(id).exec()

    if (!profile) {
      throw new HttpException('PROFILE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return profile
  }

  async createCustomerProfile(
    createCustomerProfile: CreateCustomerProfileDto,
  ): Promise<CustomerProfile> {
    return await this.customerProfileModel.create(createCustomerProfile)
  }

  async updateCustomerProfile(
    id: string,
    updateCustomerProfileDto: UpdateCustomerProfileDto,
  ): Promise<CustomerProfile> {
    const updatedProfile = await this.customerProfileModel
      .findByIdAndUpdate(id, updateCustomerProfileDto, { new: true })
      .exec()

    if (!updatedProfile) {
      throw new HttpException('PROFILE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return updatedProfile
  }

  async deleteCustomerProfile(id: string): Promise<CustomerProfile> {
    const deletedProfile = await this.customerProfileModel
      .findByIdAndDelete(id)
      .exec()

    if (!deletedProfile) {
      throw new HttpException('PROFILE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return deletedProfile
  }

  async findRestaurantProfileById(id: string): Promise<RestaurantProfile> {
    const profile = await this.restaurantProfileModel.findById(id).exec()

    if (!profile) {
      throw new HttpException('PROFILE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return profile
  }

  async createRestaurantProfile(
    createRestaurantProfileDto: CreateRestaurantProfileDto,
  ): Promise<RestaurantProfile> {
    return await this.restaurantProfileModel.create(createRestaurantProfileDto)
  }

  async updateRestaurantProfile(
    id: string,
    updateRestaurantProfileDto: UpdateRestaurantProfileDto,
  ): Promise<RestaurantProfile> {
    const updatedRestaurantProfile = await this.restaurantProfileModel
      .findByIdAndUpdate(id, updateRestaurantProfileDto, { new: true })
      .exec()

    if (!updatedRestaurantProfile) {
      throw new HttpException('PROFILE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return updatedRestaurantProfile
  }

  async deleteRestaurantProfile(id: string): Promise<RestaurantProfile> {
    const deletedProfile = await this.restaurantProfileModel
      .findByIdAndDelete(id)
      .exec()

    if (!deletedProfile) {
      throw new HttpException('PROFILE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return deletedProfile
  }
}
