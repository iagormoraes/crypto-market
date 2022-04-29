import { SimpleUser } from '../interfaces/user.interface';

export class SimpleUserMapper {
  toDomain(dto: string): SimpleUser {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      role: dto.role,
    };
  }
}
