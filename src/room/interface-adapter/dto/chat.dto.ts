import { IsNotEmpty, IsString } from 'class-validator'

export class RoomNewChatDto {
  @IsString()
  @IsNotEmpty()
  room: string

  @IsString()
  @IsNotEmpty()
  message: string

  @IsString()
  @IsNotEmpty()
  user: string
}
