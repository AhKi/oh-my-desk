import React from 'react';
import { shallow } from 'enzyme';

import ReloadTimer from '.';

describe('<ReloadTimer />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<ReloadTimer />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<ReloadTimer />);
    wrapper.setState({ timer: 6015 });

    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleCancelTimer', () => {
    const onUpdateInfo = jest.fn();
    const wrapper = shallow(<ReloadTimer id="mock-id" onUpdateInfo={onUpdateInfo} />);

    wrapper.instance().handleCancelTimer();

    expect(onUpdateInfo).toHaveBeenCalledTimes(1);
    expect(onUpdateInfo).toHaveBeenCalledWith('mock-id', {
      reloadInterval: 0,
    });
  });

  describe('should call handleTick', () => {
    const webView = {
      reload: jest.fn(),
    };
    const wrapper = shallow(<ReloadTimer reloadTimer={50} webView={webView} />);

    it('when timer <= 0', () => {
      wrapper.setState({ timer: 0 });

      wrapper.instance().handleTick();

      expect(webView.reload).toHaveBeenCalledTimes(1);
      expect(webView.reload).toHaveBeenCalledWith();
      expect(wrapper.instance().state.timer).toBe(50);
    });

    it('when timer <= 0', () => {
      wrapper.setState({ timer: 10 });

      wrapper.instance().handleTick();

      expect(webView.reload).toHaveBeenCalledTimes(0);
      expect(wrapper.instance().state.timer).toBe(9);
    });
  });

  it.skip('should call componentDidUpdate', () => {
    const componentDidUpdate = jest.spyOn(ReloadTimer.prototype, 'componentDidUpdate');
    const wrapper = shallow(<ReloadTimer />);

    expect(wrapper.instance().state.timer).toBe(0);
    expect(componentDidUpdate).toHaveBeenCalledTimes(0);

    wrapper.setProps({ reloadTimer: 50 });

    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
    expect(wrapper.instance().state.timer).toBe(50);
  });

  it.skip('should test componentDidMount and componentWillUnmount', () => {
    jest.useFakeTimers();
    const componentDidMount = jest.spyOn(ReloadTimer.prototype, 'componentDidMount');
    const componentWillUnmount = jest.spyOn(ReloadTimer.prototype, 'componentWillUnmount');
    const wrapper = shallow(<ReloadTimer />);
    const { handleTick, tick } = wrapper.instance();

    expect(componentDidMount).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(
      handleTick,
      1000,
    );

    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenCalledWith(tick);
  });

  describe.skip('should test handleToggleTimer', () => {
    jest.useFakeTimers();

    const wrapper = shallow(<ReloadTimer />);

    it('when this.tick === null', () => {
      wrapper.instance().tick = null;
      wrapper.instance().handleToggleTimer();

      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenCalledWith(
        wrapper.instance().handleTick,
        1000,
      );
    });

    it('when this.tick !== null', () => {
      wrapper.instance().tick = 50;
      wrapper.instance().handleToggleTimer();

      expect(clearInterval).toHaveBeenCalledTimes(1);
      expect(clearInterval).toHaveBeenCalledWith(50);
    });
  });
});
