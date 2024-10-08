import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'
import { CreateUserDto, UpdateUserDto } from './dto'
import { ProfilesService } from '../profiles/profiles.service'
import { hash } from '@/shared/utils'
import { UpdateProfileDto } from '../profiles/dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly profilesService: ProfilesService,
  ) {}

  // !! Fix this
  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const {
  //     email,
  //     password,
  //     firstName,
  //     lastName,
  //     phoneNumber,
  //     birthDate,
  //     profileType,
  //     restaurantName,
  //     address,
  //   } = createUserDto

  //   let profileData: IProfile

  //   if (profileType === ProfileType.RESTAURANT) {
  //     profileData = {
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //       birthDate,
  //       profileType,
  //       restaurantName,
  //       address,
  //     }
  //   } else {
  //     profileData = {
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //       birthDate,
  //       profileType,
  //     }
  //   }

  //   const profile = await this.profilesService.createProfile(profileData)

  //   const hashedPassword = await hash(password)

  //   const newUser = await this.userModel.create({
  //     email,
  //     password: hashedPassword,
  //     profile,
  //   })

  //   return newUser
  // }

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
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const user = await this.findUserById(id)

    if (!user || !user.profile) {
      throw new HttpException('PROFILE_NOT_FOUND', HttpStatus.NOT_FOUND)
    }

    await this.profilesService.updateProfile(
      user.profile._id.toString(),
      updateProfileDto,
    )

    return this.findUserById(id)
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.findUserById(id)

    if (user.profile) {
      await this.profilesService.deleteProfile(user.profile._id.toString())
    }

    const deletedUser = await this.userModel.findByIdAndDelete(id).exec()

    if (!deletedUser) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return deletedUser
  }
}
