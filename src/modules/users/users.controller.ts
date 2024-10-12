import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto, UpdateUserDto } from './dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findUserById(id)
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto)
  }

  @Patch(':id/profile')
  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: any,
  ) {
    const user = await this.usersService.findUserById(id)

    if (user.profileModel === 'CustomerProfile') {
      return this.usersService.updateUserProfile(id, updateProfileDto)
    } else if (user.profileModel === 'RestaurantProfile') {
      return this.usersService.updateUserProfile(id, updateProfileDto)
    } else {
      throw new HttpException('INVALID_PROFILE_TYPE', HttpStatus.BAD_REQUEST)
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id)
  }
}
