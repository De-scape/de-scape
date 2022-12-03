import { Module } from '@nestjs/common'
import { GithubStrategy } from './github.strategy'

@Module({
  providers: [GithubStrategy],
})
export class GithubModule {}
