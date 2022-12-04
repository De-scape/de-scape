import { ValidationPipeOptions } from '@nestjs/common'

export const validationPipeOption: ValidationPipeOptions = {
  transform: true,
  // 검증이 이루어지지 않은 프로퍼티 제거
  whitelist: true,
  // 검증이 이루어지지 않은 프로퍼티가 있을때 에러 표시
  forbidNonWhitelisted: true,
}
