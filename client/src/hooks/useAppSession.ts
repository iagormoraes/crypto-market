import { useSession } from 'next-auth/react';

import { User } from '../modules/user/interfaces/user.interface';

export const AppSessionState = {
  Authenticated: 'authenticated',
  Unauthenticated: 'unauthenticated',
};

type AppSession = {
  user?: User;
};

export default function useAppSession() {
  const { status, data } = useSession();
  const session = data as unknown as AppSession;

  return {
    status,
    session,
  };
}
