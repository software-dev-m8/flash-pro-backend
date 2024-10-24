import { Injectable, BadRequestException } from '@nestjs/common'
import { MinioClientService } from '@/modules/minio-client/minio-client.service'
import { BufferedFile } from '@/modules/minio-client/file.model'

@Injectable()
export class FileUploadService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadSingle(image: BufferedFile) {
    const uploaded_image = await this.minioClientService.uploadFile(image)

    return {
      image_name: uploaded_image.fileName,
      message: 'Successfully uploaded',
    }
  }

  async uploadMany(files: BufferedFile) {
    const image1 = files['image1'][0]
    const uploaded_image1 = await this.minioClientService.uploadFile(image1)

    const image2 = files['image2'][0]
    const uploaded_image2 = await this.minioClientService.uploadFile(image2)

    return {
      image1_name: uploaded_image1.fileName,
      image2_name: uploaded_image2.fileName,
      message: 'Successfully uploaded mutiple image on MinioS3',
    }
  }

  async getFile(fileName: string) {
    try {
      const fileStream = await this.minioClientService.getObject(
        'photos',
        fileName,
      )
      return fileStream
    } catch (error) {
      console.error('Error retrieving file:', error)
      throw new BadRequestException('Error retrieving file')
    }
  }
}
