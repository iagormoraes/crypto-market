import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

import { JwtTokenException } from '../exceptions/jwt-token.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    if (info instanceof TokenExpiredError)
      throw new JwtTokenException('Expired token');

    return super.handleRequest(err, user, info, context, status);
  }
}
