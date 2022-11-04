import { plainToClass, plainToInstance } from 'class-transformer'
import { IsIn, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator'
import { RedisOptions } from 'ioredis'

const enviroments = ['dev', 'staging', 'prod'] as const
type Environment = typeof enviroments[number]

class EnvironmentVariables {
  @IsIn(enviroments)
  @IsNotEmpty()
  NODE_ENV: Environment

  @IsString()
  @IsNotEmpty()
  TEMP_REDIS_HOST: string

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
  private static get env(): EnvironmentVariables {
    return plainToClass(EnvironmentVariables, process.env, {
      enableImplicitConversion: true,
    })
  }

  public static getRedisConfig(): RedisOptions {
    const { TEMP_REDIS_HOST, REDIS_PORT } = this.env
    return {
      host: TEMP_REDIS_HOST,
      port: REDIS_PORT,
    }
  }

  public static validateConfig(env: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, env, { enableImplicitConversion: true })
    const errors = validateSync(validatedConfig, { skipMissingProperties: false })

    if (errors.length > 0) {
      throw new Error(errors.toString())
    }

    return validatedConfig
  }
}
