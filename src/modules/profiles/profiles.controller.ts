import { Body, Controller, Post } from '@nestjs/common'
import { ProfilesService } from './profiles.service'
import { CreateProfileDto } from './dto'

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // @Post()
  // createProfile(@Body() createProfileDto: CreateProfileDto) {
  //   return this.profilesService.createProfile(createProfileDto)
  // }
}
