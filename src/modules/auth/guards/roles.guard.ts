import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { Role } from '../models/roles.model'
import { TokenPayload } from '../models/token.model'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Obtenemos los roles validos para el endpoint
    const validRoles: Role[] = this.reflector.get(
      ROLES_KEY,
      context.getHandler(),
    )

    if (!validRoles) return true

    const request = context.switchToHttp().getRequest()

    const user = request.user as TokenPayload

    const isValidRole = validRoles.includes(user.role as Role)

    if (!isValidRole) {
      throw new ForbiddenException()
    }

    return isValidRole
  }
}
