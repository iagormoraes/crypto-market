import { User } from '../interfaces/user.inteface';

export class CreateUserMapper {
  toDomain(model: any): User {
    return {
      id: model._id,
      name: model.name,
      email: model.email,
      role: model.role,
      password: model.password,
    };
  }
}
