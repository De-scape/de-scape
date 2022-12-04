import { HttpExceptionFilter } from '@common/exceptions/http-exception.filter'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { winstonLogger } from 'src/winston.util'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // 검증이 이루어지지 않은 프로퍼티 제거
      whitelist: true,
      // 검증이 이루어지지 않은 프로퍼티가 있을때 에러 표시
      forbidNonWhitelisted: true,
    }),
  )

  app.useGlobalFilters(new HttpExceptionFilter())

  //prisma client set shutdown hook
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(3000)
}
bootstrap()
