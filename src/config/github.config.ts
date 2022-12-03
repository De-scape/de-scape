import { AppConfig } from '@config/app.config'
import { ConfigType, registerAs } from '@nestjs/config'

export const GITHUB_CONFIG = registerAs('GITHUB', () => AppConfig.getGithubConfig())
export type GithubConfig = ConfigType<typeof GITHUB_CONFIG>
