import { IoAdapter } from '@nestjs/platform-socket.io'
import { ServerOptions } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'
import { INestApplicationContext, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export class RedisIoAdapter extends IoAdapter {
  //   constructor(appOrHttpServer: INestApplicationContext, private readonly configService: ConfigService) {
  //     super(appOrHttpServer)
  //   }

  private logger = new Logger('RedisIoAdapter')
  //   private REDIS_HOST = this.configService.get('REDIS').HOST
  private REDIS_HOST = process.env.REDIS_HOST

  private adapterConstructor: ReturnType<typeof createAdapter>

  async connectToRedis(): Promise<void> {
    console.log('createIOServer Success')
    const pubClient = createClient({ url: this.REDIS_HOST })
    const subClient = pubClient.duplicate()
    await Promise.all([pubClient.connect(), subClient.connect()])
    this.adapterConstructor = createAdapter(pubClient, subClient)

    this.logger.debug(`Connect to Redis : ${this.REDIS_HOST}`)
  }

  createIOServer(port: number, options?: ServerOptions): any {
    // gateway에서 실제로 socket.io 객체가 생성될 때 불리는 것으로 추정
    console.log('createIOServer Succegffghss')
    const server = super.createIOServer(port, options)
    server.adapter(this.adapterConstructor)

    this.logger.log(`Create SocketIO Server using redis adapter`)

    return server
  }
}
