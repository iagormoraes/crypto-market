import { Role } from '../roles/role.enum';

export type User = {
  id: number;
  email: string;
  password: string;
  role: Role;
};
