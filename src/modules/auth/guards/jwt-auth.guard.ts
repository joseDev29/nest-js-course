import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Obtiene la metadata del endpoint y trae el valor que tenga la propiedad IS_PUBLIC_KEY
    const isPublic: boolean = this.reflector.get(
      IS_PUBLIC_KEY,
      context.getHandler(),
    )

    if (isPublic) return true

    //Ejecuta el canActivate por defecto que trae el padre
    return super.canActivate(context)
  }
}
