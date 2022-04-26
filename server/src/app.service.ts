import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { constants } from './config/constants';

import { UsersService } from './models/users/users.service';
import { UsersSpreadService } from './models/users-spread/users-spread.service';
import { AuthService } from './models/auth/auth.service';
import { Role } from './models/roles/role.enum';
import { User } from './models/users/interfaces/user.inteface';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private usersService: UsersService,
    private userSpreadService: UsersSpreadService,
    private authService: AuthService,
  ) {}

  /**
   * Procedure to seed user of role Admin.
   */
  async onApplicationBootstrap() {
    const admin = await this.usersService.findOne(
      constants.adminCredentials.email,
    );

    if (admin) return;

    await this.authService.register(
      {
        ...constants.adminCredentials,
        name: 'Admin',
      },
      {
        role: Role.Admin,
        spreadPercentage: 0,
      },
    );
  }
}
