import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from '../../models/users/entities/user.entity';
import { Role } from '../constants/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  private readonly reflector: Reflector;

  public constructor(reflector: Reflector) {
    this.reflector = reflector;
  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    const user = context.switchToHttp().getRequest<Request>().user as User;

    return !requiredRoles || requiredRoles.some(role => role === user.role);
  }
}
