import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const allowedOrigins = configService.get('ALLOWED_ORIGINS')
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    exposedHeaders: ['Authorization'],
    credentials: true,
  })

  const environment = configService.get('ENVIRONMENT')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: environment === 'prod',
    }),
  )
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Flash Pro API')
    .setDescription('')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = configService.get('PORT')
  await app.listen(port)
}
bootstrap()
