import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { HttpException, HttpStatus } from '@nestjs/common';

export class JwtTokenException extends UnauthorizedException {
  constructor(objectOrError = '', description = 'Expired token') {
    super(
      HttpException.createBody(
        objectOrError,
        'JwtTokenError',
        HttpStatus.UNAUTHORIZED,
      ),
      description,
    );
  }
}
