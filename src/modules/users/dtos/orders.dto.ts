import { OmitType, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator'
import { ObjectId, Types } from 'mongoose'

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string

  @IsDate()
  @IsNotEmpty()
  readonly date: Date

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Types.ObjectId)
  readonly products: Types.ObjectId[]
}

export class UpdateOrderDTO extends PartialType(
  OmitType(CreateOrderDTO, ['products']),
) {}

export class AddProductsToOrderDTO {
  @IsArray()
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  readonly products: ObjectId
}
