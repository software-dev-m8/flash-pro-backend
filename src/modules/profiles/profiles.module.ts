import { Module } from '@nestjs/common'
import { ProfilesController } from './profiles.controller'
import { ProfilesService } from './profiles.service'
import { MongooseModule } from '@nestjs/mongoose'

import { Profile, ProfileSchema } from './schemas'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Profile.name,
        schema: ProfileSchema,
        // discriminators: [
        //   { name: CustomerProfile.name, schema: CustomerProfileSchema },
        //   { name: RestaurantProfile.name, schema: RestaurantProfileSchema },
        // ],
      },
    ]),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
