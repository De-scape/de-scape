import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator'
import { UserService } from '../use-case/user.service'

class CreateDTO {
  @IsEmail()
  @IsDefined()
  email: string

  @IsOptional()
  @IsString()
  name?: string
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateDTO) {
    const { email, name } = body

    const result = await this.userService.create(email, name)

    return result
  }

  @Get()
  async find(@Query('email') email: string) {
    const result = await this.userService.findOne(email)

    return result
  }
}
