import { UserRolesEnum } from './user-roles.interface';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRolesEnum;
  spread: {
    spreadPercentage: number;
  };
}

export interface SimpleUser {
  id: string;
  name: string;
  email: string;
  role: UserRolesEnum;
  spread: number;
}
