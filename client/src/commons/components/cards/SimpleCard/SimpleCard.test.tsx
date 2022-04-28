import { getByText, render, screen } from '@testing-library/react';

import SimpleCard from '.';

describe('<SimpleCard/>', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <SimpleCard title="title">children</SimpleCard>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders title and description', async () => {
    const props = {
      title: 'Title',
      children: <p>children</p>,
    };

    render(<SimpleCard title={props.title}>{props.children}</SimpleCard>);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText('children')).toBeInTheDocument();
  });
});
