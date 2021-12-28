import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly image: string
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
