import { render } from '@testing-library/react';

import PageCarousel from '.';

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => <div>{children}</div>,
  SwiperSlide: ({ children }: any) => <div>{children}</div>,
}));

describe('<PageCarousel/>', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <PageCarousel>
        <section />
        <section />
      </PageCarousel>,
    );

    expect(container).toMatchSnapshot();
  });
});
