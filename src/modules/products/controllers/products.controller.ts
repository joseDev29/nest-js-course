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
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dto'
import { ProductsService } from '../services/products.service'

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return {
      ok: true,
      data: this.productsService.findAll(),
    }
  }

  @Get(':id')
  getByID(@Param('id') id: string) {
    try {
      const product = this.productsService.findOne(id)

      if (!product)
        throw new NotFoundException(`Product with id '${id}' not found`)

      return {
        ok: true,
        data: product,
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
  create(@Body() payload: CreateProductDTO) {
    try {
      const product = this.productsService.create(payload)

      return {
        ok: true,
        data: product,
      }
    } catch (error) {
      return {
        ok: false,
        msg: error.message,
      }
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDTO) {
    try {
      const product = this.productsService.update(id, payload)

      return {
        ok: true,
        data: product,
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
      const product = this.productsService.delete(id)

      return {
        ok: true,
        data: product,
      }
    } catch (error) {
      return {
        ok: false,
        msg: error.message,
      }
    }
  }
}
