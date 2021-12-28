import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateSkillDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly color: string
}

export class UpdateSkillDTO extends PartialType(CreateSkillDTO) {}
