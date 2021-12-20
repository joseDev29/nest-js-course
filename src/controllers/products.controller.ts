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
  Res,
  NotFoundException,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common'

import { Response } from 'express'
import { CreateProductDTO, UpdateProductDTO } from 'src/dtos/products.dto'
import { CustomParseIntPipe } from 'src/pipes/custom-parse-int.pipe'

import { ProductsService } from 'src/services/products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getProducts(
    @Query(
      'limit',
      new ParseIntPipe({
        exceptionFactory: () =>
          new BadRequestException("Query 'limit' must be a number"),
      }),
    )
    limit: number = 0,
    @Query('pagination', CustomParseIntPipe)
    pagination: number = 0,
  ) {
    return {
      ok: true,
      limit,
      pagination,
      data: this.productService.findAll(),
    }
  }

  @Get(':id')
  getProductByID(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ) {
    try {
      const product = this.productService.findOne(id)

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
  createProduct(@Body() payload: CreateProductDTO) {
    return {
      ok: true,
      data: this.productService.create(payload),
    }
  }

  @Put(':id')
  updateProduct(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @Body() payload: UpdateProductDTO,
  ) {
    let product = this.productService.update(id, payload)

    if (!product) {
      res.status(HttpStatus.NOT_FOUND)
      return {
        ok: false,
        msg: 'Product not found',
      }
    }

    return {
      ok: true,
      data: product,
    }
  }

  @Delete(':id')
  deleteProduct(
    //La propiedad passthrough permite de que a psear de que se injecte la respuesta
    //Nest JS pueda seguir su marco de ejecucion
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ) {
    const product = this.productService.delete(id)

    if (!product) {
      res.status(HttpStatus.NOT_FOUND)
      return {
        ok: false,
        msg: 'Product not found',
      }
    }

    return {
      ok: true,
      data: product,
    }
  }
}
