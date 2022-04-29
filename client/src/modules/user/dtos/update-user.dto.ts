import { UserRolesEnum } from '../interfaces/user-roles.interface';

export interface UpdateUserDto {
  id: string;
  name: string;
  email: string;
  role: UserRolesEnum;
}
