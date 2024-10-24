import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Param,
  Res,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FilesInterceptor } from '@nestjs/platform-express'
import { FileUploadService } from './file-upload.service'
import { BufferedFile } from '@/modules/minio-client/file.model'
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger'

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
      throw new BadRequestException('Upload image failed!')
    }
    return await this.fileUploadService.uploadSingle(image)
  }

  @Get(':fileName')
  @ApiOperation({ summary: 'Get file by name' })
  @ApiParam({ name: 'fileName', description: 'Name of the file to retrieve' })
  async getFile(@Param('fileName') fileName: string, @Res() res) {
    try {
      const fileStream = await this.fileUploadService.getFile(fileName)
      fileStream.pipe(res)
    } catch (error) {
      console.error('Error in getFile:', error)
      throw new BadRequestException('Error retrieving file')
    }
  }

  // @Post('multiple')
  // @UseInterceptors(FilesInterceptor('images',10)) // ใช้ FilesInterceptor สำหรับอัปโหลดหลายไฟล์
  // @ApiOperation({ summary: 'Upload multiple images' })
  // async uploadMany(@UploadedFiles() images: BufferedFile[]) {
  //   if (!images || images.length === 0) {
  //     throw new BadRequestException('Upload images failed!');
  //   }
  //   return await Promise.all(images.map(image => this.fileUploadService.uploadSingle(image)),);
  // }
}
