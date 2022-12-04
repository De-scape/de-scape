import { WsExceptionFilter } from '@common/exceptions/filters/ws-exception.filter'
import { validationPipeOption } from '@common/pipes/validation-pipe-option'
import { WsValidationPipe } from '@common/pipes/ws-validation.pipe'
import { Logger, UseFilters, UsePipes } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ROOM_EVENT } from 'src/room/domain/room-event'
import { RoomNewChatDto } from 'src/room/interface-adapter/dto/chat.dto'
import { JoinRoomDto } from 'src/room/interface-adapter/dto/join-room.dto'

@UsePipes(new WsValidationPipe(validationPipeOption))
@UseFilters(WsExceptionFilter)
@WebSocketGateway({ namespace: 'room' })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(private logger: Logger) {}

  @WebSocketServer()
  server: Server

  afterInit() {
    this.logger.debug(`Socket server init complete`)
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const { username } = client.handshake.query
    this.logger.debug(`${username} is connected (${client.id})`)
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const { username } = client.handshake.query
    this.logger.debug(`${username} is disconnected... (${client.id})`)
  }

  @SubscribeMessage(ROOM_EVENT.JOIN_ROOM)
  async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: JoinRoomDto) {
    const { room, user } = payload
    this.logger.debug(`${user} join ${room} request `, RoomGateway.name)

    await client.join(room)

    client.to(room).emit(ROOM_EVENT.NEW_USER_JOIN, { message: `${user} is join the ${room}` })

    const { userCount, userNames } = await this.getAllUser(room)

    return { message: `success join ${room}, current user number : ${userCount}, user list : [${userNames}]` }
  }

  @SubscribeMessage(ROOM_EVENT.NEW_CHAT)
  newChat(@MessageBody() payload: RoomNewChatDto) {
    const { room } = payload

    this.server.to(room).emit(ROOM_EVENT.NEW_CHAT, payload)
  }

  private async getAllUser(room: string) {
    const clients = await this.server.in(room).fetchSockets()

    const userNames = clients.map(client => client.handshake.query.username)

    return { userCount: clients.length, userNames }
  }
}
