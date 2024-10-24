import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client } from 'minio'
import * as crypto from 'crypto'
import { BufferedFile } from './file.model'

@Injectable()
export class MinioClientService {
  private readonly minioClient: Client
  private readonly bucketName: string
  private readonly logger = new Logger(MinioClientService.name)

  constructor(private readonly configService: ConfigService) {
    try {
      this.minioClient = new Client({
        endPoint: this.configService.get<string>('MINIO_ENDPOINT'),
        port: Number(this.configService.get<string>('MINIO_PORT')),
        useSSL: this.configService.get<string>('MINIO_USE_SSL') === 'true',
        accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
        secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
      })

      this.bucketName = this.configService.get<string>('MINIO_BUCKET_NAME')

      this.ensureBucket()
    } catch (error) {
      this.logger.error('Error initializing Minio Client', error)
      throw new HttpException(
        'Minio Client Initialization Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  private async ensureBucket() {
    try {
      const exists = await this.minioClient.bucketExists(this.bucketName)
      if (!exists) {
        this.logger.warn(
          `Bucket "${this.bucketName}" does not exist. Creating...`,
        )
        await this.minioClient.makeBucket(this.bucketName, '')
        this.logger.log(`Bucket "${this.bucketName}" created successfully.`)
      } else {
        this.logger.log(`Bucket "${this.bucketName}" already exists.`)
      }
    } catch (error) {
      this.logger.error(`Error checking/creating bucket: ${error.message}`)
      throw new HttpException(
        'Minio bucket check/create failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async uploadFile(file: BufferedFile) {
    try {
      const fileName =
        crypto.randomBytes(16).toString('hex') + file.originalname
      await this.minioClient.putObject(this.bucketName, fileName, file.buffer)
      this.logger.log(`File ${fileName} uploaded successfully.`)
      return { fileName }
    } catch (error) {
      this.logger.error(`File upload error: ${error.message}`)
      throw new HttpException(
        'File upload failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async deleteFile(fileName: string) {
    try {
      await this.minioClient.removeObject(this.bucketName, fileName)
      this.logger.log(`File ${fileName} deleted successfully.`)
    } catch (error) {
      this.logger.error(`File deletion error: ${error.message}`)
      throw new HttpException(
        'File deletion failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
  async getObject(bucketName: string, fileName: string) {
    try {
      const fileStream = await this.minioClient.getObject(bucketName, fileName)
      return fileStream
    } catch (error) {
      console.error('Error retrieving object from MinIO:', error)
      throw new Error('Could not retrieve file from MinIO')
    }
  }
}
