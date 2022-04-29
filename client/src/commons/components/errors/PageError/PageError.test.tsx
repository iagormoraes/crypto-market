import { render, screen } from '@testing-library/react';
import PageError from './index';

describe('<PageError/>', () => {
  it('matches snapshot', () => {
    const { container } = render(<PageError error="Not Found" />);

    expect(container).toMatchSnapshot();
  });

  it('renders error message Not Found', () => {
    render(<PageError error="Not Found" />);

    expect(
      screen.getByText(
        `Sorry, we couldn't find the requested resource, try again.`,
      ),
    ).toBeTruthy();
  });
});
