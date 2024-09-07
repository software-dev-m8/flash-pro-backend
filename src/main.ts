import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

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
  // swagger init here
  const port = configService.get('PORT')
  await app.listen(port)
}
bootstrap()
