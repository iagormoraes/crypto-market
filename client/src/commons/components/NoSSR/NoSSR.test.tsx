import { render, screen } from '@testing-library/react';

import NoSSR from '.';

describe('<NoSSR/>', () => {
  it('matches snapshot', () => {
    const { container } = render(<NoSSR>children</NoSSR>);

    expect(container).toMatchSnapshot();
  });

  it('renders only on client side', () => {
    render(
      <NoSSR>
        <p>content</p>
      </NoSSR>,
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
