import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { DatabaseModule } from './modules/database/database.module'
import { ProfilesModule } from './modules/profiles/profiles.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { FileUploadModule } from './file-upload/file-upload.module';
import { MinioClientModule } from '@/modules/minio-client/minio-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configuration,
    }),
    DatabaseModule,
    ProfilesModule,
    UsersModule,
    AuthModule,
    FileUploadModule,
    MinioClientModule,
  ],
})
export class AppModule {}
