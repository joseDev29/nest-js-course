import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config'

import config from 'src/config/config'
import { UsersModule } from '../users/users.module'
import { AuthService } from './services/auth.service'
import { AuthController } from './controllers/auth.controller'
import { LocalStrategy } from './strategies/local.strategy'
import { JWTStrategy } from './strategies/jwt.strategy'

@Module({
  providers: [AuthService, LocalStrategy, JWTStrategy],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { secret, expirationTime } = configService.auth.jwt

        return {
          secret,
          signOptions: { expiresIn: expirationTime },
        }
      },
      inject: [config.KEY],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
