//import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @IsEmail()
  //Agrega una descripcion del atributo a la documentacion generada por swagger
  @ApiProperty({ description: 'User email' })
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  readonly password: string

  @IsString()
  @IsNotEmpty()
  readonly role: string
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
