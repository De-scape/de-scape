import { ERROR } from '@common/constants/error'
import { RedisConfig } from '@config/redis.config'
import { HttpException, Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import Redis, { RedisKey } from 'ioredis'

@Injectable()
export class RedisStore {
  private store: Redis

  constructor(@Inject(RedisConfig.KEY) private config: ConfigType<typeof RedisConfig>) {
    this.store = new Redis(config)
  }

  async create(key: RedisKey, value: string) {
    if (await this.isExist(key)) throw new DuplicateKeyException(key)
    const result = await this.store.set(key, value)
    return result
  }

  async createWithExpiration(key: RedisKey, value: string, expiration: number) {
    if (await this.isExist(key)) throw new DuplicateKeyException(key)
    const result = await this.store.setex(key, expiration, value)
    return result
  }

  async updateByKey(key: RedisKey, value: string) {
    if (!(await this.isExist(key))) throw new NonExistKeyException(key)
    const result = await this.store.set(key, value)
    return result
  }

  async updateByKeyWithExpiration(key: RedisKey, value: string, expiration: number) {
    if (!(await this.isExist(key))) throw new NonExistKeyException(key)
    const result = await this.store.setex(key, expiration, value)
    return result
  }

  async findByKey(key: RedisKey) {
    if (!(await this.isExist(key))) throw new NonExistKeyException(key)
    return this.store.get(key)
  }

  async deleteByKey(key: RedisKey) {
    if (!(await this.isExist(key))) throw new NonExistKeyException(key)
    return this.store.del(key)
  }

  private isExist = async (key: RedisKey): Promise<boolean> => ((await this.store.get(key)) ? true : false)
}

class DuplicateKeyException extends HttpException {
  constructor(key: RedisKey) {
    super(`${ERROR.REDIS.CONFLICT.message} (key: ${key})`, ERROR.REDIS.CONFLICT.status)
  }
}

class NonExistKeyException extends HttpException {
  constructor(key: RedisKey) {
    super(`${ERROR.REDIS.NOT_FOUND} (key: ${key})`, ERROR.REDIS.NOT_FOUND.status)
  }
}
