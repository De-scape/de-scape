import { Module } from '@nestjs/common'
import { UserService } from './use-case/user.service'
import { UserController } from './interface-adapter/user.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserRepository } from './infra/repository/user.repository'

@Module({
  imports: [PrismaModule],
  providers: [UserService, { provide: 'UserRepository', useClass: UserRepository }],
  controllers: [UserController],
})
export class UserModule {}
