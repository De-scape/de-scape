import { AppConfig } from '@config/app.config'
import { registerAs } from '@nestjs/config'

export const RedisConfig = registerAs('REDIS', () => AppConfig.getRedisConfig())
