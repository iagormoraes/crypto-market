import { renderHook } from '@testing-library/react';
import useAppSession, { AppSessionState } from '../useAppSession';
import { SessionProvider } from 'next-auth/react';

global.fetch = jest.fn(
  (): Promise<any> =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    }),
);

describe('useAppSession hook', () => {
  it('should return loading state', () => {
    const { result } = renderHook(() => useAppSession(), {
      wrapper: ({ children }: any) => (
        <SessionProvider>{children}</SessionProvider>
      ),
    });

    expect(result.current.status).toEqual(AppSessionState.Loading);
    expect(result.current.session).toBeUndefined();
  });

  it('should return authorized state', () => {
    const session = {
      user: {
        name: 'name',
        email: 'email',
        image: 'image',
      },
      expires: new Date().toISOString(),
    };
    const { result } = renderHook(() => useAppSession(), {
      wrapper: ({ children }) => (
        <SessionProvider session={session}>{children}</SessionProvider>
      ),
    });

    expect(result.current.status).toEqual(AppSessionState.Authenticated);
    expect(result.current.session).toEqual(session);
  });
});
