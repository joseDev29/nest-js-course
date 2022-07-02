import { PartialType } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @IsEmail()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  readonly password: string

  @IsString()
  @IsNotEmpty()
  readonly role: string
}

//PartyalType tambien puede venir de @nestjs/mapped-types
export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
