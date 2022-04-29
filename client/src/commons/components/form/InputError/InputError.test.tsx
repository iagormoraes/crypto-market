import { render } from '@testing-library/react';

import InputError from '.';

describe('<InputError/>', () => {
  it('matches snapshot', () => {
    const { container } = render(<InputError>Error</InputError>);

    expect(container).toMatchSnapshot();
  });
});
