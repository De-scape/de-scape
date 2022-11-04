import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common'
import { Response, Request } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger()

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const req = ctx.getRequest<Request>()
    const status = exception.getStatus()
    // // HttpException 함수에 인자값으로 에러를 핸들링해줬을 경우 (String) || 그 외의 라이브러리에서 자동으로 에러처리를 해줬을 경우 (Object)
    const error = exception.getResponse() as string | { message: string | string[] }
    const message = typeof error === 'string' ? error : error.message

    res.status(status).json({ message })

    this.logger.error(
      `${req.ip} ${req.method} ${res.statusCode} \nbody ${JSON.stringify(req.body, null, 2)}\n`,
      exception.stack,
      req.originalUrl,
    )
  }
}
