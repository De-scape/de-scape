import { Catch, ArgumentsHost, Logger } from '@nestjs/common'
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'

// TODO: Dto에서 Pipe로 발생되는 에러 외의 경우를 확인하지 못함
@Catch(WsException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  private logger = new Logger()

  catch(exception: WsException, host: ArgumentsHost) {
    super.catch(exception, host)

    const ctx = host.switchToWs()
    const client = ctx.getClient<Socket>()
    const data = ctx.getData()
    // WsException에 인자값으로 에러를 핸들링해줬을 경우 (String) || 그 외의 라이브러리에서 자동으로 에러처리를 해줬을 경우 ({ ..., message: string | srting[], ...})
    const error = exception.getError() as string | { message: string | string[] }
    const message = typeof error === 'string' ? error : error.message

    client.emit('error', { message })

    this.logger.error(
      `${JSON.stringify(data, null, 2)} ${JSON.stringify(message, null, 2)}`,
      exception.stack,
      WsExceptionFilter.name,
    )
  }
}
