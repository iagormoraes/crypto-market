import { Injectable } from '@nestjs/common';

import { UsersRepository } from './repositories/users.repository';
import { User } from './interfaces/user.inteface';
import { Role } from '../roles/role.enum';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
