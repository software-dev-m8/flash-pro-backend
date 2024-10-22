import { Injectable } from '@nestjs/common';
import { MinioClientService } from '@/modules/minio-client/minio-client.service';
import { BufferedFile } from '@/modules/minio-client/file.model';

@Injectable()
export class FileUploadService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadSingle(image: BufferedFile) {
    const uploaded_image = await this.minioClientService.uploadFile(image);

    return {
      image_url: uploaded_image.url,
      message: 'Successfully uploaded',
    };
  }

  async uploadMany(files: BufferedFile) {
    const image1 = files['image1'][0];
    const uploaded_image1 = await this.minioClientService.uploadFile(image1);
    

    const image2 = files['image2'][0];
    const uploaded_image2 = await this.minioClientService.uploadFile(image2);

    return {
      image1_url: uploaded_image1.url,
      image2_url: uploaded_image2.url,
      message: 'Successfully uploaded mutiple image on MinioS3',
    };
  }
}