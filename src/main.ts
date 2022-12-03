import { HttpExceptionFilter } from '@common/exceptions/filters/http-exception.filter'
import { validationPipeOption } from '@common/pipes/validation-pipe-option'
import { IoAdapterFactory } from '@common/socket-adapter/io-adapter-factory'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { winstonLogger } from 'src/winston.util'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  })

  app.useGlobalPipes(new ValidationPipe(validationPipeOption))

  app.useGlobalFilters(new HttpExceptionFilter())

  app.useWebSocketAdapter(await IoAdapterFactory.createRedisAdapter(app))

  await app.listen(3000)
}
bootstrap()
