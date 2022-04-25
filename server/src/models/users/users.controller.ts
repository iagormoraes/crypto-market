import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Role } from '../roles/role.enum';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  @Get('user/profile')
  @UseGuards(RolesGuard(Role.Admin))
  getProfile(@Request() req) {
    return req.user;
  }
}
