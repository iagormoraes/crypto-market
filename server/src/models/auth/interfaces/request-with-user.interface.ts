import { Request } from '@nestjs/common';
import { User } from '../../users/users.dto';

export interface RequestWithUser extends Request {
  user: Omit<User, 'password'>;
}
