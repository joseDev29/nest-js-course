import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { FilterQuery, Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import {
  CreateProductDTO,
  FilterProductsDTO,
  UpdateProductDTO,
} from '../dtos/products.dto'
import { Product } from '../entities/product.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  findAll(params?: FilterProductsDTO): Promise<Product[]> {
    if (params) {
      const filters: FilterQuery<Product> = {}
      //Offset hace referencia al numero de productos a omitir
      const { limit, offset, minPrice, maxPrice } = params

      //$gte hace referencia a mayor o igual
      if (minPrice)
        filters.price = {
          ...filters.price,
          $gte: minPrice,
        }

      //$lte hace referencia a menor o igual
      if (maxPrice)
        filters.price = {
          ...filters.price,
          $lte: maxPrice,
        }

      return this.productModel
        .find(filters)
        .skip(offset)
        .limit(limit)
        .populate('brand')
        .exec()
    }

    //Con populate podemos pedir tambien el valor referenciado en el obejectId
    //de la propiedad brand
    return this.productModel.find().populate('brand').exec()
  }

  findOne(id: ObjectId): Promise<Product> {
    return this.productModel.findById(id).populate('brand').exec()
  }

  create(payload: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(payload)
    return product.save()
  }

  update(id: ObjectId, payload: UpdateProductDTO): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(
        id,
        //Con $set solo se mofican los objetos que vayan en el payload
        { $set: payload },
        {
          //Return document after update
          new: true,
        },
      )
      .exec()
  }

  delete(id: ObjectId): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec()
  }
}
