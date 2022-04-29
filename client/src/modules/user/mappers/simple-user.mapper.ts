import { SimpleUser } from '../interfaces/user.interface';

export class SimpleUserMapper {
  toDomain(dto: string): SimpleUser {
    return {
      id: dto.user.id,
      name: dto.user.name,
      email: dto.user.email,
      role: dto.user.role,
      spread: dto.spread.spreadPercentage,
    };
  }
}
