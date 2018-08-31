import { remote } from 'electron';
import React from 'react';
import { shallow } from 'enzyme';
import SearchMenu from '.';

describe('Test SearchMenu Component', () => {
  remote.getGlobal = jest.fn(() => () => JSON.stringify({ status: { lang: 'English' } }));
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot', () => {
    const wrapper = shallow(<SearchMenu />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when props.filter === FAVORITES', () => {
    const wrapper = shallow(<SearchMenu filter="FAVORITES" />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('should test handleSetAllFilter', () => {
    it('when props.filter === FAVORITES', () => {
      const onSetFilter = jest.fn();
      const wrapper = shallow(
        <SearchMenu
          filter="FAVORITES"
          onSetFilter={onSetFilter}
        />,
      );

      wrapper.instance().handleSetAllFilter();

      expect(onSetFilter).toHaveBeenCalledTimes(1);
      expect(onSetFilter).toHaveBeenCalledWith('ALL');
    });

    it('when props.filter === ALL', () => {
      const onSetFilter = jest.fn();
      const wrapper = shallow(
        <SearchMenu
          filter="ALL"
          onSetFilter={onSetFilter}
        />,
      );

      wrapper.instance().handleSetAllFilter();

      expect(onSetFilter).toHaveBeenCalledTimes(0);
    });
  });

  describe('should test handleSetFavoritesFilter', () => {
    it('when props.filter === FAVORITES', () => {
      const onSetFilter = jest.fn();
      const wrapper = shallow(
        <SearchMenu
          filter="FAVORITES"
          onSetFilter={onSetFilter}
        />,
      );

      wrapper.instance().handleSetFavoritesFilter();

      expect(onSetFilter).toHaveBeenCalledTimes(0);
    });

    it('when props.filter === ALL', () => {
      const onSetFilter = jest.fn();
      const wrapper = shallow(
        <SearchMenu
          filter="ALL"
          onSetFilter={onSetFilter}
        />,
      );

      wrapper.instance().handleSetFavoritesFilter();

      expect(onSetFilter).toHaveBeenCalledTimes(1);
      expect(onSetFilter).toHaveBeenCalledWith('FAVORITES');
    });
  });
});
