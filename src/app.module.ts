import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { DatabaseModule } from './modules/database/database.module'
import { ProfilesModule } from './modules/profiles/profiles.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configuration,
      // mongo config
      // load: [mongo]
    }),
    DatabaseModule,
    ProfilesModule,
    UsersModule,
  ],
})
export class AppModule {}
