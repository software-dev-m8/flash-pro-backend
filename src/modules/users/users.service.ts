import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'
import { CreateUserDto, UpdateUserDto } from './dto'
import { ProfilesService } from '../profiles/profiles.service'
import { hash } from '@/shared/utils'
import { Role } from '@/shared/enums'
import { CustomerProfile, RestaurantProfile } from '../profiles/schemas'
import {
  UpdateCustomerProfileDto,
  UpdateRestaurantProfileDto,
} from '../profiles/dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly profilesService: ProfilesService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(createUserDto.password)

    if (!createUserDto.role) {
      createUserDto.role = Role.CUSTOMER
    }

    let profile: CustomerProfile | RestaurantProfile
    if (createUserDto.role == Role.CUSTOMER && createUserDto.customerProfile) {
      profile = await this.profilesService.createCustomerProfile(
        createUserDto.customerProfile,
      )
    } else if (
      createUserDto.role == Role.RESTAURANT &&
      createUserDto.restaurantProfile
    ) {
      profile = await this.profilesService.createRestaurantProfile(
        createUserDto.restaurantProfile,
      )
    } else {
      throw new HttpException('INVALID_DATA', HttpStatus.BAD_REQUEST)
    }

    const newUser = await this.userModel.create({
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role,
      profile: profile._id,
      profileModel:
        createUserDto.role == Role.CUSTOMER
          ? 'CustomerProfile'
          : 'RestaurantProfile',
    })

    return newUser
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('profile').exec()
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).populate('profile').exec()

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return user
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec()

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return user
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password)
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
    )

    if (!updatedUser) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    return updatedUser
  }

  async updateUserProfile(
    id: string,
    updateProfileDto: UpdateCustomerProfileDto | UpdateRestaurantProfileDto,
  ) {
    const user = await this.findUserById(id)

    if (!user || !user.profile) {
      throw new HttpException('PROFILE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    let updatedProfile: CustomerProfile | RestaurantProfile
    const profileId = user.profile._id.toString()

    if (user.profileModel === 'CustomerProfile') {
      updatedProfile = await this.profilesService.updateCustomerProfile(
        profileId,
        updateProfileDto as UpdateCustomerProfileDto,
      )
    } else if (user.profileModel === 'RestaurantProfile') {
      updatedProfile = await this.profilesService.updateRestaurantProfile(
        profileId,
        updateProfileDto as UpdateRestaurantProfileDto,
      )
    } else {
      throw new HttpException(
        'INVALID_PROFILE_TYPE_OR_MISSING_DTO',
        HttpStatus.BAD_REQUEST,
      )
    }

    // return this.findUserById(id)
    return updatedProfile
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.findUserById(id)

    if (user.profile) {
      const profileId = user.profile._id.toString()
      if (user.profileModel === 'CustomerProfile') {
        await this.profilesService.deleteCustomerProfile(profileId)
      } else if (user.profileModel === 'RestaurantProfile') {
        await this.profilesService.deleteRestaurantProfile(profileId)
      } else {
        throw new HttpException('INVALID_PROFILE_TYPE', HttpStatus.BAD_REQUEST)
      }
    }

    const deletedUser = await this.userModel.findByIdAndDelete(id).exec()

    if (!deletedUser) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return deletedUser
  }
}
