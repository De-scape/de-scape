import { Inject, Injectable } from '@nestjs/common'
import { IUserRepository } from '../domain/repository/iUser.repository'

@Injectable()
export class UserService {
  constructor(@Inject('UserRepository') private readonly userRepository: IUserRepository) {}

  async create(email: string, name?: string) {
    const result = await this.userRepository.createUser(email, name)

    return result
  }

  async findOne(email: string) {
    const result = await this.userRepository.findUser(email)

    return result
  }
}
