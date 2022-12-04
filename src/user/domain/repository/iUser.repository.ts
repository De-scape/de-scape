import { User } from '../user.domain'

export interface IUserRepository {
  createUser(email: string, name?: string): Promise<boolean>
  findUser(email: string): Promise<User>
}
