import {formattedValue} from '../formatters';

describe('formattedValue', () => {
  it('formattedValue', () => {
    expect(formattedValue(678903)).toEqual(678903);
    expect(formattedValue(3.9)).toEqual(3.9);
    expect(formattedValue(3.55)).toEqual(3.55);
    expect(formattedValue(3.002)).toEqual(3);
    expect(formattedValue(3.009)).toEqual(3.01);
  });
});
