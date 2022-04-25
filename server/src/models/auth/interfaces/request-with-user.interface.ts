import { Request } from '@nestjs/common';
import { User } from '../../users/interfaces/user.inteface';

export interface RequestWithUser extends Request {
  user: Omit<User, 'password'>;
}
