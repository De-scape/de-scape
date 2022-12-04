import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IUserRepository } from 'src/user/domain/repository/iUser.repository'
import { User } from 'src/user/domain/user.domain'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(email: string, name?: string): Promise<boolean> {
    const result = await this.prismaService.user.create({
      data: {
        email,
        name,
      },
    })
    console.log(result)

    return !!result
  }

  async findUser(email: string): Promise<User> {
    const document = await this.prismaService.user.findFirst({ where: { email } })
    console.log(document)

    if (!document) throw Error('Not Found')

    const result = new User(document.email, document.name || undefined)

    return result
  }
}
