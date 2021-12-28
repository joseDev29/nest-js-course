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
import { ObjectId } from 'mongoose'
import { MongoIdPipe } from 'src/pipes/mongo-id.pipe'
import { CreateBrandDTO, UpdateBrandDTO } from '../dtos/brands.dto'
import { BrandsServices } from '../services/brands.service'

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsServices) {}

  @Get()
  async getAll() {
    return {
      ok: true,
      data: await this.brandsService.findAll(),
    }
  }

  @Get(':id')
  async getByID(@Param('id', MongoIdPipe) id: ObjectId) {
    const brand = await this.brandsService.findOne(id)

    if (!brand) throw new NotFoundException(`Brand with id '${id}' not found`)

    return {
      ok: true,
      data: brand,
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateBrandDTO) {
    const brand = await this.brandsService.create(payload)

    return {
      ok: true,
      data: brand,
    }
  }

  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: ObjectId,
    @Body() payload: UpdateBrandDTO,
  ) {
    const brand = await this.brandsService.update(id, payload)

    if (!brand) throw new NotFoundException(`Brand with id '${id}' not found`)

    return {
      ok: true,
      data: brand,
    }
  }

  @Delete(':id')
  async delete(@Param('id', MongoIdPipe) id: ObjectId) {
    const brand = await this.brandsService.delete(id)

    if (!brand) throw new NotFoundException(`Brand with id '${id}' not found`)

    return {
      ok: true,
      data: brand,
    }
  }
}
