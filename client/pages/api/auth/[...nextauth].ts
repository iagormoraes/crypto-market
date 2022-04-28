import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { httpClientExternal } from '../../../src/lib/http-client/http-client-external';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'myemail@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        let res = null;

        try {
          const { data: response } = await httpClientExternal.request({
            url: '/auth/login',
            method: 'POST',
          });

          res = response.data;
        } catch (error) {
          res = null;
        }

        return res;
      },
    }),
  ],
});
