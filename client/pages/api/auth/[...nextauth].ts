import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { httpClientExternal } from '../../../src/lib/http-client/http-client-external';
import { LoginUserDto } from '../../../src/modules/user/dtos/login-user.dto';
import { UserMapper } from '../../../src/modules/user/mappers/user.mapper';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
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
      async authorize(credentials) {
        try {
          const { data: response } = await httpClientExternal.request({
            url: '/auth/login',
            method: 'POST',
            data: credentials,
          });

          return response.data;
        } catch (error: any) {
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          user: new UserMapper().toDomain(user.profile as LoginUserDto),
          accessToken: (user.token as Record<string, any>)
            .access_token as string,
          accessTokenExpires: +new Date(
            (user.token as Record<string, any>).access_token_expiration,
          ),
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
});
