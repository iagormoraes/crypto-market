import { SetMetadata } from '@nestjs/common';

import { Role } from '../../roles/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
