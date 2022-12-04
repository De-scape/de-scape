import { Module } from '@nestjs/common'
import { ChatService } from './use-case/chat.service'
import { ChatController } from './interface-adapter/chat.controller'

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
