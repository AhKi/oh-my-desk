import React from 'react';
import { shallow } from 'enzyme';
import SearchItem from '.';

describe('Test SearchItem Component', () => {
  const mockItem = {
    id: 'mock-id',
    name: 'mock-name',
    url: 'mock-url',
    isOpen: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot', () => {
    const wrapper = shallow(<SearchItem item={mockItem} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when item.searched === both', () => {
    const wrapper = shallow(
      <SearchItem
        item={{
          ...mockItem,
          searched: 'both',
        }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  describe('should call handleToggleWidget', () => {
    const onCloseWidget = jest.fn();
    const onShowWidget = jest.fn();

    const wrapper = shallow(
      <SearchItem
        item={mockItem}
        onCloseWidget={onCloseWidget}
        onShowWidget={onShowWidget}
      />,
    );

    it('when props.item.isOpen === false ', () => {
      expect(wrapper.instance().props.item.isOpen).toBe(false);

      wrapper.instance().handleToggleWidget();

      expect(onShowWidget).toHaveBeenCalledTimes(1);
      expect(onShowWidget).toHaveBeenCalledWith('mock-id');
      expect(onCloseWidget).toHaveBeenCalledTimes(0);
    });

    it('when props.item.isOpen === false ', () => {
      wrapper.setProps({ item: { ...mockItem, isOpen: true } });
      expect(wrapper.instance().props.item.isOpen).toBe(true);

      wrapper.instance().handleToggleWidget();

      expect(onCloseWidget).toHaveBeenCalledTimes(1);
      expect(onCloseWidget).toHaveBeenCalledWith('mock-id');
      expect(onShowWidget).toHaveBeenCalledTimes(0);
    });
  });

  it('should call handleToggleFavorites', () => {
    const onUpdateInfo = jest.fn();
    const wrapper = shallow(
      <SearchItem
        item={{
          ...mockItem,
          favorites: false,
        }}
        onUpdateInfo={onUpdateInfo}
      />,
    );

    expect(wrapper.instance().props.item.favorites).toBe(false);
    wrapper.instance().handleToggleFavorites();

    expect(onUpdateInfo).toHaveBeenCalledTimes(1);
    expect(onUpdateInfo).toHaveBeenCalledWith('mock-id', {
      favorites: true,
    });
  });
});
