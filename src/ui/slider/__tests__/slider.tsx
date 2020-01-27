import React from 'react';
import { mount } from 'enzyme';
import {Slider} from "../slider";

describe('Slider', () => {
  it('renders correctly', () => {
    const wrapper: any = mount(
      <Slider currentSlide={1} onSlideChange={() => {}}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Slider>
    );

    expect(wrapper.find('.slick-slide').length).toBe(3);
    wrapper.find(".slick-next").simulate("click");
    expect(
      wrapper
        .find(".slick-slide.slick-active")
        .first()
        .text()
    ).toEqual("3");
  });
});
