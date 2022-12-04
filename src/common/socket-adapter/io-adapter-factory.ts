import { INestApplication } from '@nestjs/common'
import { RedisIoAdapter } from './redis-io-adapter'

export class IoAdapterFactory {
  static async createRedisAdapter(app: INestApplication) {
    const redisIoAdapter = new RedisIoAdapter(app)
    await redisIoAdapter.connectToRedis()
    return redisIoAdapter
  }
}
