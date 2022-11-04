import { Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private static readonly logger = new Logger(ChatGateway.name)

  @WebSocketServer()
  server: Server

  afterInit() {
    ChatGateway.logger.debug(`Socket server init complete`)
  }

  handleConnection(client: Socket) {
    ChatGateway.logger.debug(`${client.id}(${client.handshake.query['username']}) is connected`)
    this.server.emit('connection', { message: 'hello world!' })
  }

  handleDisconnect(client: any) {
    ChatGateway.logger.debug(`${client.id} is disconnected...`)
  }

  @SubscribeMessage('echo')
  handleMessage(client: Socket, payload: unknown) {
    ChatGateway.logger.debug(client.id, payload)
    // acknowledgment
    return payload
  }
}
