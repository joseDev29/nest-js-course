import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  HttpStatus,
  NotFoundException,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ObjectId } from 'mongodb'
import { MongoIdPipe } from 'src/pipes/mongo-id.pipe'
import { Request } from 'express'

import {
  CreateProductDTO,
  FilterProductsDTO,
  UpdateProductDTO,
} from '../dtos/products.dto'
import { ProductsService } from '../services/products.service'
import { JWTAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard'
import { Public } from 'src/modules/auth/decorators/public.decorator'
import { Roles } from 'src/modules/auth/decorators/roles.decorator'
import { Role } from 'src/modules/auth/models/roles.model'
import { RolesGuard } from 'src/modules/auth/guards/roles.guard'

@UseGuards(JWTAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  async getAll(@Req() req: Request, @Query() params: FilterProductsDTO) {
    console.log('JWT USER: ', req.user)

    return {
      ok: true,
      data: await this.productsService.findAll(params),
    }
  }

  @Get(':id')
  async getByID(@Param('id', MongoIdPipe) id: ObjectId) {
    const product = await this.productsService.findOne(id)

    if (!product)
      throw new NotFoundException(`Product with id '${id}' not found`)

    return {
      ok: true,
      data: product,
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN)
  async create(@Body() payload: CreateProductDTO) {
    const product = await this.productsService.create(payload)

    return {
      ok: true,
      data: product,
    }
  }

  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: ObjectId,
    @Body() payload: UpdateProductDTO,
  ) {
    const product = await this.productsService.update(id, payload)

    if (!product)
      throw new NotFoundException(`Product with id '${id}' not found`)

    return {
      ok: true,
      data: product,
    }
  }

  @Delete(':id')
  async delete(@Param('id', MongoIdPipe) id: ObjectId) {
    const product = await this.productsService.delete(id)

    if (!product)
      throw new NotFoundException(`Product with id '${id}' not found`)

    return {
      ok: true,
      data: product,
    }
  }
}
