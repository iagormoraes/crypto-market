import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from '../interfaces/user.inteface';

export class UsersRepository {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
}
