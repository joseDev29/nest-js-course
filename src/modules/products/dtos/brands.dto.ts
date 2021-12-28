import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateBrandDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly image: string
}

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) {}
