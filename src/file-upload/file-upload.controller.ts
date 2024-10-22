import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  FileInterceptor,
} from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { BufferedFile } from '@/modules/minio-client/file.model';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('file-upload')
@Controller('file-upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Upload an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image to upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadSingle(@UploadedFile() image: BufferedFile) {
    if (!image) {
      throw new BadRequestException('Upload image failed!');
    }
    return await this.fileUploadService.uploadSingle(image);
  }

}