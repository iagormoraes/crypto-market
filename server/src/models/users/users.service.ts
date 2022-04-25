import { Injectable } from '@nestjs/common';

import { User } from './interfaces/user.inteface';
import { Role } from '../roles/role.enum';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      email: 'johndoe@example.com',
      password: 'changeme',
      role: Role.Admin,
    },
    {
      id: 2,
      email: 'johndoe1@example.com',
      password: 'changeme',
      role: Role.User,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === username);
  }
}
