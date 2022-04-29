import Input from './index';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<Input/>', () => {
  const build = () => ({
    value: 'value',
    name: 'name',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  });

  let props = build();

  beforeEach(() => {
    props = build();
  });

  it('matches snapshot', () => {
    const { container } = render(<Input form="input" field={props} />);

    expect(container).toMatchSnapshot();
  });

  it('triggers onChange event', () => {
    render(<Input form="input" field={props} />);

    const input = screen.getByLabelText(props.name) as HTMLInputElement;

    fireEvent.change(input, { target: { value: '' } });

    expect(props.onChange).toHaveBeenCalled();
    expect(input.value).toBe(props.value);
  });

  it('triggers onBlur event', () => {
    render(<Input form="input" field={props} />);

    const input = screen.getByLabelText(props.name);

    fireEvent.blur(input);

    expect(props.onBlur).toHaveBeenCalled();
  });
});
