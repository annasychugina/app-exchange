import React, {ReactNode, useRef} from 'react';
import SlickSlider, {Settings} from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick.css';
import s from './slider.module.css';

type Props = {
  children: ReactNode[];
  className?: string;
  currentSlide: number;
  onSlideChange: (index: number) => void;
};

const defaultSettings: Settings = {
  dots: true,
  arrows: true,
  infinite: false,
  speed: 260,
};

export const Slider: React.FC<Props> = ({currentSlide, children, onSlideChange}) => {
  const sliderRef = useRef<SlickSlider>(null);

  return (
    <SlickSlider {...defaultSettings} ref={sliderRef} initialSlide={currentSlide}>
      {children.map(
        (slide: ReactNode, index: number): React.ReactElement => {
          return (
            <div className={s.slide} key={index}>
              {slide}
            </div>
          );
        },
      )}
    </SlickSlider>
  );
};
