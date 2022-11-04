
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { ChatService } from '../use-case/chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  findAll() {
    return this.chatService.findAll()
  }

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id)
  }
}
