import React, {ReactNode} from 'react';
import SlickSlider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from './slider.css';

type Props = {
  children: ReactNode[];
  className?: string;
};

export const ANIMATION_SPEED = 500;
export const SLIDES_TO_SHOW_MAX_COUNT = 3;
export const SLIDES_TO_SCROLL_COUNT = 1;

const sliderSettings = {
  dots: true,
  arrows: true,
  infinite: false,
  speed: ANIMATION_SPEED,
};

export const Slider: React.FC<Props> = ({children}) => {
  return (
    <SlickSlider {...sliderSettings}>
      {children.map(
        (slide: ReactNode, index: number): React.ReactElement => (
          <div key={index} className={s.slide}>
            {slide}
          </div>
        ),
      )}
    </SlickSlider>
  );
};
