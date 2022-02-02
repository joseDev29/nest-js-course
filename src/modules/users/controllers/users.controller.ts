import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Collection, Db } from 'mongodb'

import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto'
import { UsersService } from '../services/users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  collection: Collection

  constructor(
    @Inject('MongoDBService') private readonly mongoDBService: Db,
    private readonly usersService: UsersService,
  ) {
    this.collection = mongoDBService.collection('users')
  }

  @Get()
  async getAll() {
    const users = await this.collection.find().toArray()

    return {
      ok: true,
      data: users,
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDTO) {
    const user = await this.usersService.create(payload)

    return {
      ok: true,
      data: user,
    }
  }
}
