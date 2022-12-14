import { LoggerMiddleware } from '@common/middlewares/logger.middleware'
import { AppConfig } from '@config/app.config'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from 'src/app.controller'
import { AppService } from 'src/app.service'
import { RoomModule } from 'src/room/room.module'
import { AuthModule } from './auth/auth.module'
import { configs } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validate: AppConfig.validateConfig,
      load: [...configs],
    }),
    RoomModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*') //모든 엔드포인터에 LoggerMiddleware 적용
  }
}
