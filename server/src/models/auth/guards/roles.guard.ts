import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Observable } from 'rxjs';

import { RequestWithUser } from '../interfaces/request-with-user.interface';

import { Role } from '../../roles/role.enum';

export const RolesGuard = (...roles: Role[]): Type<CanActivate> => {
  class RolesGuardMixin implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      if (!roles) return true;

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      return user && roles.includes(user.role);
    }
  }

  return mixin(RolesGuardMixin);
};
