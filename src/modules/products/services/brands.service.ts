import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { CreateBrandDTO, UpdateBrandDTO } from '../dtos/brands.dto'
import { Brand } from '../entities/brand.entity'

@Injectable()
export class BrandsServices {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
  ) {}

  findAll(): Promise<Brand[]> {
    return this.brandModel.find().exec()
  }

  findOne(id: ObjectId): Promise<Brand> {
    return this.brandModel.findById(id).exec()
  }

  create(payload: CreateBrandDTO): Promise<Brand> {
    const brand = new this.brandModel(payload)
    return brand.save()
  }

  update(id: ObjectId, payload: UpdateBrandDTO): Promise<Brand> {
    return this.brandModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec()
  }

  delete(id: ObjectId): Promise<Brand> {
    return this.brandModel.findByIdAndDelete(id).exec()
  }
}
