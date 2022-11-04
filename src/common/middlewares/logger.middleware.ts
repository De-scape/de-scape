import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger()

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      if (res.statusCode < 400) {
        this.logger.log(`${req.ip} ${req.method} ${res.statusCode}`, req.originalUrl)
        this.logger.debug(`Req Body: ${JSON.stringify(req.body)}`, req.originalUrl)
      }
    })

    next()
  }
}
