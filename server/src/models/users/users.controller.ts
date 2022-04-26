import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  @Get('user/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
