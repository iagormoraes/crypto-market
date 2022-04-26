import { UserSpread } from '../interfaces/user-spread.interface';

export class UserSpreadMapper {
  toDto(domain: UserSpread): any {
    return {
      spreadPercentage: domain.spreadPercentage,
    };
  }

  toDomain(model: any): UserSpread {
    return {
      id: model._id.toString(),
      userId: model.userId,
      spreadPercentage: model.spreadPercentage,
    };
  }
}
