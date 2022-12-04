export class User {
  constructor(email: string, name?: string) {
    this.email = email
    this.name = name
  }
  readonly email: string
  readonly name?: string
}
