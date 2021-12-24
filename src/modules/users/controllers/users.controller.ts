import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto'
import { UsersService } from '../services/users.service'

//Permite agrupar los endpoints de este controller
//en la documentacion generada por swagger
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Get('db-name')
  getConfig(): string {
    return this.configService.get('DB_NAME')
  }

  @Get()
  //Permite agregar una descripcion a cada endpoint en especifico
  //en la documentacion generada por swagger
  @ApiTags('users')
  @ApiOperation({
    description: 'Returns a list of all users',
    summary: 'Returns a list of all users',
  })
  getAll() {
    return {
      ok: true,
      data: this.usersService.findAll(),
    }
  }

  @Get(':id')
  getByID(@Param('id') id: string) {
    try {
      const user = this.usersService.findOne(id)

      if (!user) throw new NotFoundException(`User with id '${id}' not found`)

      return {
        ok: true,
        data: user,
      }
    } catch (error) {
      return {
        ok: false,
        msg: error.message,
      }
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateUserDTO) {
    try {
      const user = this.usersService.create(payload)

      return {
        ok: true,
        data: user,
      }
    } catch (error) {
      return {
        ok: false,
        msg: error.message,
      }
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDTO) {
    try {
      const user = this.usersService.update(id, payload)

      return {
        ok: true,
        data: user,
      }
    } catch (error) {
      return {
        ok: false,
        msg: error.message,
      }
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      const user = this.usersService.delete(id)

      return {
        ok: true,
        data: user,
      }
    } catch (error) {
      return {
        ok: false,
        msg: error.message,
      }
    }
  }

  @Get('orders/:id')
  getOrdersByID(@Param('id') id: string) {
    try {
      const data = this.usersService.findOrdersByUser(id)

      return {
        ok: true,
        data,
      }
    } catch (error) {
      return {
        ok: false,
        msg: error.message,
      }
    }
  }
}
