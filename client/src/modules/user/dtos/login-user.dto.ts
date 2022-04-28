import { UserRolesEnum } from '../interfaces/user-roles.interface';

export interface LoginUserDto {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRolesEnum;
  };
  spread: {
    spreadPercentage: number;
  };
}
