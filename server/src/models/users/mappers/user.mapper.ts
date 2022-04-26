import { User } from '../interfaces/user.inteface';

export class UserMapper {
  toDomain(model: any): User {
    return {
      id: model._id.toString(),
      name: model.name,
      email: model.email,
      role: model.role,
      password: model.password,
    };
  }
}
