
import { Injectable } from '@nestjs/common'
import { Chat } from '../domain/chat.domain'

@Injectable()
export class ChatService {
  findAll() {
    return `This action returns all chat`
  }

  create(chat: Chat) {
    return 'This action adds a new chat'
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`
  }

  update(id: number, chat: Chat) {
    return `This action updates a #${id} chat`
  }

  remove(id: number) {
    return `This action removes a #${id} chat`
  }
}

