import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import config from 'src/config/config'
import { ConfigType } from '@nestjs/config'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, @Inject(config.KEY) private readonly configService: ConfigType<typeof config> ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.header('Auth')

    //Obtenemos el parametro pasado en el @SetMetada del controller
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    )

    if (isPublic) return isPublic

    const isAuth = authHeader === this.configService.auth.apiKey

    if (!isAuth) throw new UnauthorizedException('Not allow')

    return isAuth
  }
}
