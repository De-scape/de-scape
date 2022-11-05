import { AppConfig } from '@config/app.config'
import { ConfigType, registerAs } from '@nestjs/config'

export const REDIS_CONFIG = registerAs('REDIS', () => AppConfig.getRedisConfig())
export type RedisConfig = ConfigType<typeof REDIS_CONFIG>
