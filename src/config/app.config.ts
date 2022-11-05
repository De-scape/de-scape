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
  REDIS_HOST: string

  @IsNumber()
  @IsNotEmpty()
  REDIS_PORT: number

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string

  @IsNumber()
  @IsNotEmpty()
  JWT_EXPIRATION_TIME_SECONDS: number

  @IsString()
  @IsNotEmpty()
  GITHUB_OAUTH_CLIENT_ID: string

  @IsString()
  @IsNotEmpty()
  GITHUB_OAUTH_CLIENT_SECRET: string

  @IsString()
  @IsNotEmpty()
  GITHUB_OAUTH_CALLBACK_URL: string
}

export class AppConfig {
  private static get env(): EnvironmentVariables {
    return plainToClass(EnvironmentVariables, process.env, {
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

  public static getGithubConfig() {
    const { GITHUB_OAUTH_CALLBACK_URL, GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_SECRET } = this.env
    return {
      clientID: GITHUB_OAUTH_CLIENT_ID,
      clientSecret: GITHUB_OAUTH_CLIENT_SECRET,
      callbackURL: GITHUB_OAUTH_CALLBACK_URL,
    }
  }

  public static getJwtConfig() {
    const { JWT_SECRET, JWT_EXPIRATION_TIME_SECONDS } = this.env
    return {
      secret: JWT_SECRET,
      expirationTime: JWT_EXPIRATION_TIME_SECONDS,
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
