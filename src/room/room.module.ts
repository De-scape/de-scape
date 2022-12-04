import { Logger, Module } from '@nestjs/common'
import { RoomGateway } from './interface-adapter/room.gateway'

@Module({
  imports: [],
  controllers: [],
  providers: [RoomGateway, Logger],
})
export class RoomModule {}
