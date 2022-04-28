import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { Role } from '../roles/role.enum';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('users/user/profile')
  getProfile(@Request() req) {
    return this.usersService.profile(req.user);
  }

  @Put('admin/users/:id')
  @UseGuards(RolesGuard(Role.Admin))
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id) {
    return this.usersService.update({ ...updateUserDto, id });
  }

  @Delete('admin/users/:id')
  @UseGuards(RolesGuard(Role.Admin))
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
