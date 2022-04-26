import { UserSpread } from '../interfaces/user-spread.interface';

export class UserSpreadMapper {
  toDomain(model: any): UserSpread {
    return {
      id: model._id.toString(),
      userId: model.userId,
      spreadPercentage: model.spreadPercentage,
    };
  }
}
