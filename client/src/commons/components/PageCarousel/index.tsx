import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  EffectCreative,
  Mousewheel,
  Parallax,
  Navigation,
  SwiperOptions,
} from 'swiper';

import 'swiper/css';
import ArrowIcon, { ArrowIconDirection } from '../icons/ArrowIcon';
import classnames from 'classnames';

interface Props {
  children: ReactElement[];
}

export default function PageCarousel({ children }: Props) {
  const leftRef = useRef<HTMLButtonElement | null>(null);
  const rightRef = useRef<HTMLButtonElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const options: SwiperOptions = useMemo(
    () =>
      ({
        modules: [Mousewheel, EffectCreative, Parallax, Navigation],
        navigation: {
          prevEl: mounted && leftRef.current,
          nextEl: mounted && rightRef.current,
        },
        mousewheel: {
          forceToAxis: true,
        },
        creativeEffect: {
          prev: {
            translate: [0, '-120%', -500],
          },
          next: {
            translate: [0, '120%', -500],
          },
        },
        effect: 'creative',
        parallax: true,
        direction: 'vertical',
        speed: 500,
      } as SwiperOptions),
    [mounted],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative">
      <Swiper
        className="w-screen h-screen"
        {...options}
        onSlideChange={(slider) => {
          setCurrentIndex(slider.realIndex);
        }}
      >
        {children.map((item, index) => (
          <SwiperSlide key={index}>{item}</SwiperSlide>
        ))}
      </Swiper>
      <div className="container mx-auto relative">
        <button
          ref={leftRef}
          className={classnames(
            'absolute bottom-20 md:bottom-24 right-4 z-10 p-4 rounded-full border-2 border-white opacity-70',
            {
              ['opacity-10 pointer-events-none']: currentIndex <= 0,
            },
          )}
        >
          <ArrowIcon
            direction={ArrowIconDirection.TOP}
            className="w-4 h-4 md:w-8 md:h-8 fill-white"
          />
        </button>
        <button
          ref={rightRef}
          className={classnames(
            'absolute bottom-4 right-4 z-10 p-4 rounded-full border-2 border-white opacity-70',
            {
              ['opacity-10 pointer-events-none']:
                currentIndex >= children?.length - 1,
            },
          )}
        >
          <ArrowIcon
            direction={ArrowIconDirection.BOTTOM}
            className="w-4 h-4 md:w-8 md:h-8 fill-white"
          />
        </button>
      </div>
    </div>
  );
}
