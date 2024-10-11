import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { DatabaseModule } from './modules/database/database.module'
import { ProfilesModule } from './modules/profiles/profiles.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { CouponsModule } from './modules/coupons/coupons.module';

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
    AuthModule,
    CouponsModule,
  ],
})
export class AppModule {}
