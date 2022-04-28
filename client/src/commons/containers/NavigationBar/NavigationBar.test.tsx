import { render } from '@testing-library/react';

import NavigationBar from '.';

describe('<NavigationBar/>', () => {
  it('matches snapshot', () => {
    const { container } = render(<NavigationBar />);

    expect(container).toMatchSnapshot();
  });
});
