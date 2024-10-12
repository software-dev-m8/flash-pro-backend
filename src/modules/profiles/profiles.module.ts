import { Module } from '@nestjs/common'
import { ProfilesService } from './profiles.service'
import { MongooseModule } from '@nestjs/mongoose'
import {
  CustomerProfile,
  CustomerProfileSchema,
  RestaurantProfile,
  RestaurantProfileSchema,
} from './schemas'
import { Branch, BranchSchema } from '../branches/schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CustomerProfile.name,
        schema: CustomerProfileSchema,
      },
      {
        name: RestaurantProfile.name,
        schema: RestaurantProfileSchema,
      },
      { name: Branch.name, schema: BranchSchema },
    ]),
  ],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
