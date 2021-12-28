import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsPositive,
  IsUrl,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
} from 'class-validator'

import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateCategoryDTO } from './categories.dtos'

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly description: string

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number

  @IsUrl()
  @IsNotEmpty()
  readonly image: string

  @IsNotEmpty()
  //Valida todas las propiedades dentro del objeto
  @ValidateNested()
  readonly category: CreateCategoryDTO

  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProductsDTO {
  @IsOptional()
  @IsPositive()
  limit: number

  @IsOptional()
  @Min(0)
  offset: number

  @IsOptional()
  @Min(0)
  minPrice: number

  //Es requerido si se envia el parametro minPrice
  //@ValidateIf((params) => params.minPrice)
  @IsOptional()
  @IsPositive()
  maxPrice: number
}
