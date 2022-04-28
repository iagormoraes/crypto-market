import { render, screen } from '@testing-library/react';

import ArrowIcon, { ArrowIconDirection } from './ArrowIcon';

describe('<ArrowIcon/>', () => {
  it('matches snapshot', () => {
    const { container } = render(<ArrowIcon />);

    expect(container).toMatchSnapshot();
  });

  it('render correct direction', () => {
    const { rerender } = render(<ArrowIcon />);

    expect(screen.getByTestId('arrow-icon')).toHaveClass('rotate-0');

    rerender(<ArrowIcon direction={ArrowIconDirection.BOTTOM} />);

    expect(screen.getByTestId('arrow-icon')).toHaveClass('rotate-90');

    rerender(<ArrowIcon direction={ArrowIconDirection.LEFT} />);

    expect(screen.getByTestId('arrow-icon')).toHaveClass('rotate-180');

    rerender(<ArrowIcon direction={ArrowIconDirection.TOP} />);

    expect(screen.getByTestId('arrow-icon')).toHaveClass('-rotate-90');
  });
});
