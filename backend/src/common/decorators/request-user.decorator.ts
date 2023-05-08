import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../models/users/entities/user.entity';

export const ReqUser = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();
  const user = req.user as User;
  return data ? user?.[data] : user;
});
