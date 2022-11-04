import { Module } from '@nestjs/common'
import { ChatService } from './use-case/chat.service'
import { ChatGateway } from './interface-adapter/chat.gateway'
import { ChatEntity } from 'src/entities/chat.entity'

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway],
})
export class ChatModule {}
