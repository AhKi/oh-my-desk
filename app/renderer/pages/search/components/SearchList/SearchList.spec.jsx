import React from 'react';
import { shallow } from 'enzyme';
import SearchList from '.';

describe('Test SearchList Component', () => {
  const mockList = [{ id: 'mock1', isOpen: false }, { id: 'mock2', isOpen: false }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot', () => {
    const wrapper = shallow(<SearchList />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot', () => {
    const wrapper = shallow(<SearchList list={mockList} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should test componentDidMount and componentWillUnmount', () => {
    const componentDidMount = jest.spyOn(SearchList.prototype, 'componentDidMount');
    const componentWillUnmount = jest.spyOn(SearchList.prototype, 'componentWillUnmount');
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    const wrapper = shallow(<SearchList />);
    const { handleKeyboardEvent } = wrapper.instance();

    expect(componentDidMount).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledWith(
      'keydown',
      handleKeyboardEvent,
    );

    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
    expect(window.removeEventListener).toHaveBeenCalledTimes(1);
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'keydown',
      handleKeyboardEvent,
    );
  });

  describe('test handleKeyboardEvent', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const onSelectDecrease = jest.fn();
    const onSelectIncrease = jest.fn();
    const onHideWindow = jest.fn();
    const onShowWidget = jest.fn();
    const wrapper = shallow(
      <SearchList
        list={mockList}
        onSelectDecrease={onSelectDecrease}
        onSelectIncrease={onSelectIncrease}
        onHideWindow={onHideWindow}
        onShowWidget={onShowWidget}
      />,
    );

    it('when e.key === ArrowUp', () => {
      wrapper.instance().handleKeyboardEvent({ ...event, key: 'ArrowUp' });

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).toHaveBeenCalledWith();

      expect(onSelectDecrease).toHaveBeenCalledTimes(1);
    });

    it('when e.key === ArrowDown', () => {
      wrapper.instance().handleKeyboardEvent({ ...event, key: 'ArrowDown' });

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).toHaveBeenCalledWith();

      expect(onSelectIncrease).toHaveBeenCalledTimes(1);
    });

    it('when e.key === Enter', () => {
      wrapper.instance().handleKeyboardEvent({ ...event, key: 'Enter' });

      expect(onShowWidget).toHaveBeenCalledTimes(1);
      expect(onShowWidget).toHaveBeenCalledWith('mock1', true);
      expect(onHideWindow).toHaveBeenCalledTimes(1);
      expect(onHideWindow).toHaveBeenCalledWith();
    });
  });
});
