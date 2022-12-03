import { plainToClass, plainToInstance } from 'class-transformer'
import { IsIn, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator'
import { RedisOptions } from 'ioredis'

const NODE_ENVS = ['dev', 'staging', 'prod'] as const
type NodeEnvType = typeof NODE_ENVS[number]

class Environment {
  @IsIn(NODE_ENVS)
  @IsNotEmpty()
  NODE_ENV: NodeEnvType

  @IsString()
  @IsNotEmpty()
  REDIS_HOST: string

  @IsNumber()
  @IsNotEmpty()
  REDIS_PORT: number

  //   @IsString()
  //   @IsNotEmpty()
  //   JWT_SECRET: string
}

export class AppConfig {
  private static get env(): Environment {
    return plainToClass(Environment, process.env, {
      enableImplicitConversion: true,
    })
  }

  public static getRedisConfig(): RedisOptions {
    const { REDIS_HOST, REDIS_PORT } = this.env
    return {
      host: REDIS_HOST,
      port: REDIS_PORT,
    }
  }

  public static validateConfig(env: Record<string, unknown>) {
    const validatedConfig = plainToClass(Environment, env, { enableImplicitConversion: true })
    const errors = validateSync(validatedConfig, { skipMissingProperties: false })

    if (errors.length > 0) {
      throw new Error(errors.toString())
    }

    return validatedConfig
  }
}
