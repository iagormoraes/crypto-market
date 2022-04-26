import { Role } from '../../roles/role.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}
