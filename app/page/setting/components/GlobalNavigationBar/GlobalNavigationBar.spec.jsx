import React from 'react';
import { shallow } from 'enzyme';
import cx from 'classnames';

import GlobalNavigationBar from '.';

describe('<GlobalNavigationBar />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<GlobalNavigationBar />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('should test GlobalNavigationBar.listClassName', () => {
    const { listClassName } = GlobalNavigationBar;

    it('when typeof target === string', () => {
      expect(listClassName('current-mock', 'current-mock')).toEqual(
        cx('GlobalNavigationBar__list', 'GlobalNavigationBar__list-active'),
      );

      expect(listClassName('current-mock', 'current-value')).toEqual(
        cx('GlobalNavigationBar__list'),
      );
    });

    it('when typeof target is Array Type', () => {
      expect(listClassName('current-mock', ['current-mock', 'current-value'])).toEqual(
        cx('GlobalNavigationBar__list', 'GlobalNavigationBar__list-active'),
      );

      expect(listClassName('current-mock', ['current-value', 'value'])).toEqual(
        cx('GlobalNavigationBar__list'),
      );
    });

    it('when typeof target is not string and array', () => {
      expect(listClassName('current-mock', {})).toEqual(
        cx('GlobalNavigationBar__list'),
      );
    });
  });

  describe('should test GlobalNavigationBar.calculateIsActive', () => {
    const { calculateIsActive } = GlobalNavigationBar;

    it('should when typeof target is string', () => {
      expect(calculateIsActive('mock-current', 'mock-current'))
        .toBe(true);
      expect(calculateIsActive('mock-current', 'mock-target'))
        .toBe(false);
    });

    it('should when typeof target is array', () => {
      expect(calculateIsActive('mock-current', ['mock-current', 'mock-target']))
        .toBe(true);
      expect(calculateIsActive('mock-current', ['mock-target', 'mock-target-2']))
        .toBe(false);
    });

    it('should when typeof target is not array or string', () => {
      expect(calculateIsActive('mock-current', 1)).toBe(false);
    });
  });
});
