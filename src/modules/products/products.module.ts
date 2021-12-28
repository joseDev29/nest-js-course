import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BrandsController } from './controllers/brands.controller'
import { ProductsController } from './controllers/products.controller'
import { Brand, BrandSchema } from './entities/brand.entity'
import { Product, ProductSchema } from './entities/product.entity'
import { BrandsServices } from './services/brands.service'
import { ProductsService } from './services/products.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [ProductsController, BrandsController],
  providers: [ProductsService, BrandsServices],
  exports: [ProductsService],
})
export class ProductsModule {}
