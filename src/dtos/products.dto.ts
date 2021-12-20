import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
} from 'class-validator'

import { PartialType } from '@nestjs/mapped-types'

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number
}

//Opcion 1
// export class UpdateProductDTO {
//   @IsOptional()
//   @IsString()
//   readonly name?: string

//   @IsOptional()
//   @IsNumber()
//   @IsPositive()
//   readonly price?: number
// }

//Opcion 2
export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
