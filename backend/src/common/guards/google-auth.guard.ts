import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {

  public getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions<any> {
    const appId = context.switchToHttp().getRequest<Request>().query.appId;
    return appId ? { state: `appId=${appId}` } : {};
  }
}
