import { User } from 'next-auth';
import { withAuth } from 'next-auth/middleware';

import { UserRolesEnum } from '../../src/modules/user/interfaces/user-roles.interface';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return (token?.user as User)?.role === UserRolesEnum.Admin;
    },
  },
});
