import React from 'react';
import { ipcRenderer } from 'electron';
import { shallow } from 'enzyme';
import SearchMenu from '.';

describe('Test SearchMenu Component', () => {
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

  it('should call ipcRenderer.send when click data-test-id="menu-setting"', () => {
    const wrapper = shallow(<SearchMenu />);
    const btn = wrapper.find('[data-test-id="menu-setting"]');

    btn.simulate('click');

    expect(ipcRenderer.send).toHaveBeenCalledTimes(1);
    expect(ipcRenderer.send).toHaveBeenCalledWith('preference.open');
  });

  it('should call props.onMakeWidgetRequest when click data-test-id="menu-new-widget"', () => {
    const onMakeWidgetRequest = jest.fn();
    const wrapper = shallow(<SearchMenu onMakeWidgetRequest={onMakeWidgetRequest} />);
    const btn = wrapper.find('[data-test-id="menu-new-widget"]');

    btn.simulate('click');

    expect(onMakeWidgetRequest).toHaveBeenCalledTimes(1);
  });
});
