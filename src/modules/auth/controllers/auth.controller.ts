import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../services/auth.service'
import { User } from 'src/modules/users/entities/user.entity'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Req() req: Request) {
    const user = req.user as User

    // this.authService.generateJWT(<User>user)
    return this.authService.generateJWT(user)
  }
}
