import { render } from '@testing-library/react';

import Button, { ButtonVariant } from '.';

describe('<Button/>', () => {
  it('matches snapshot', () => {
    const { container } = render(<Button>Button</Button>);

    expect(container).toMatchSnapshot();
  });
});
