import { GithubConfig, GITHUB_CONFIG } from '@config/github.config'
import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-github2'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(@Inject(GITHUB_CONFIG.KEY) private readonly config: GithubConfig) {
    super({
      ...config,
      scope: ['public_profile'],
    })
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    console.log(profile)

    return profile
  }
}
