import { render } from '@testing-library/react';
import NavigationBar from '.';
import { SessionProvider } from 'next-auth/react';

global.fetch = jest.fn(
  (): Promise<any> =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    }),
);

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
    };
  },
}));

describe('<NavigationBar/>', () => {
  it('matches snapshot on loading', () => {
    const { container } = render(<NavigationBar />, {
      wrapper: ({ children }) => <SessionProvider>{children}</SessionProvider>,
    });

    expect(container).toMatchSnapshot();
  });
});
