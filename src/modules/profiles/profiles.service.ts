import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CustomerProfile, RestaurantProfile } from './schemas'
import {
  CreateCustomerProfileDto,
  CreateRestaurantProfileDto,
  UpdateCustomerProfileDto,
  UpdateRestaurantProfileDto,
} from './dto'
import { Branch } from '../branches/schema'

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(CustomerProfile.name)
    private readonly customerProfileModel: Model<CustomerProfile>,
    @InjectModel(RestaurantProfile.name)
    private readonly restaurantProfileModel: Model<RestaurantProfile>,
    @InjectModel(Branch.name)
    private readonly branchModel: Model<Branch>,
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
    const profile = await this.restaurantProfileModel
      .findById(id)
      .populate('branch')
      .exec()

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

  // ! fix this
  async updateRestaurantProfile(
    id: string,
    updateRestaurantProfileDto: UpdateRestaurantProfileDto,
  ): Promise<RestaurantProfile> {
    const existingProfile = await this.restaurantProfileModel.findById(id)

    if (!existingProfile) {
      throw new HttpException('PROFILE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    const newBranchIds = updateRestaurantProfileDto.branches
      ? await this.branchModel
          .find({ _id: { $in: updateRestaurantProfileDto.branches } })
          .distinct('_id')
      : []

    console.log(newBranchIds)

    const existingBranches = existingProfile.branches || []
    const allBranches = [
      ...new Set([
        ...existingBranches.map((id) => id.toString()),
        ...newBranchIds.map((id) => id.toString()),
      ]),
    ]

    console.log(allBranches)

    const updatedRestaurantProfile = await this.restaurantProfileModel
      .findByIdAndUpdate(
        id,
        {
          ...updateRestaurantProfileDto,
          branches: allBranches.map((id) => new Types.ObjectId(id)),
        },
        { new: true },
      )
      .exec()

    console.log(updatedRestaurantProfile)

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
