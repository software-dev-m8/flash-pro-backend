import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { DatabaseModule } from './modules/database/database.module'
import { ProfilesModule } from './modules/profiles/profiles.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { CouponsModule } from './modules/coupons/coupons.module';
import { BranchesModule } from './modules/branches/branches.module';
import { UserCouponsModule } from './modules/userCoupons/userCoupons.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configuration,
      // mongo config
      // load: [mongo]
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    ProfilesModule,
    UsersModule,
    AuthModule,
    CouponsModule,
    BranchesModule,
    UserCouponsModule,
  ],
})
export class AppModule {}
