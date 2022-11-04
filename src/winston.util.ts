import { utilities, WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import * as winstonDaily from 'winston-daily-rotate-file'

const env = process.env.NODE_ENV

const dailyOptions = (level: string): winstonDaily.DailyRotateFileTransportOptions => {
  const logDir = __dirname + '/../logs'

  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: `${logDir}/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30, // 최근 30일까지 저장
    zippedArchive: true, // 로그가 쌓이면 압축하여 관리
  }
}

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: env === 'prod' ? 'info' : 'debug',
      format:
        env === 'prod'
          ? // TODO: prod 환경에선 자원 문제로 simple 사용한다는데 (가독성) 검증 필요.
            winston.format.simple()
          : winston.format.combine(
              //   winston.format.errors({ stack: true })
              winston.format.timestamp(),
              utilities.format.nestLike('Nest', {
                colors: true,
                prettyPrint: true,
              }),
            ),
    }),

    // warn, error 로그는 파일로 관리
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
})
