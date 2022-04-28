import { LoginUserDto } from '../dtos/login-user.dto';

import { User } from '../interfaces/user.interface';

export class UserMapper {
  toDomain(dto: LoginUserDto): User {
    return {
      id: dto.user.id,
      name: dto.user.name,
      email: dto.user.email,
      role: dto.user.role,
      spread: dto.spread,
    };
  }
}
