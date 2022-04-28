import { render } from '@testing-library/react';

import BitcoinRenderer from '.';

jest.mock('three', () => {
  const THREE = jest.requireActual('three');
  return {
    ...THREE,
    WebGLRenderer: jest.fn().mockReturnValue({
      domElement: document.createElement('div'), // create a fake div
      setSize: jest.fn(),
      render: jest.fn(),
      setClearColor: jest.fn(),
    }),
  };
});

describe('<BitcoinRenderer/>', () => {
  it('matches snapshot', () => {
    const { container } = render(<BitcoinRenderer />);

    expect(container).toMatchSnapshot();
  });
});
