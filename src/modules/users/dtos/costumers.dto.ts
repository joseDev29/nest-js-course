import { PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator'
import { CreateSkillDTO } from './skills.dto'

export class CreateCostumerDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly lastName: string

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string

  @IsNotEmpty()
  @IsArray()
  //Se valida que venga un array y que contega elementos de tipo SkillsDTO
  @ValidateNested({ each: true })
  //Declara el tipo de los objetos contenidos en el array
  @Type(() => CreateSkillDTO)
  readonly skills: CreateSkillDTO[]
}

export class UpdateCostumerDTO extends PartialType(CreateCostumerDTO) {}
