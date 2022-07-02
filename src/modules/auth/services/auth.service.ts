import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

import { User } from 'src/modules/users/entities/user.entity'
import { UsersService } from 'src/modules/users/services/users.service'
import { TokenPayload } from '../models/token.model'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)

    if (!user) return null

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) return user

    return null
  }

  generateJWT(user: User) {
    const { role, id } = user

    const payload: TokenPayload = { id, role }

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    }
  }
}
