import { ValidationError, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'

/**
 * @nestjs/common의 ValidationPipe를 확장해 HttpException대신 WsException을 발생시키는 파이프
 *
 * https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts
 */
export class WsValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super(options)
  }

  public createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      const errors = this.flattenValidationErrors(validationErrors)
      return new WsException({ message: errors })
    }
  }
}
