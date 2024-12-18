import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MinioClientModule } from '@/modules/minio-client/minio-client.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, MinioClientModule],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}