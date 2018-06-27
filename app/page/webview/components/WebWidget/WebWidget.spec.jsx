import React from 'react';
import { mount } from 'enzyme';

import * as utils from 'utils/updateWidget';
import WebWidget from '.';

describe('<WebWidget />', () => {
  const webView = {
    canGoBack() {},
    canGoForward() {},
    goBack() {},
    goForward() {},
    reload() {},
    stop() {},
    isMaximized() {},
  };
  const ipcRenderer = {
    on: () => {},
    send: () => {},
  };
  const remote = {
    getCurrentWindow: () => {},
  };
  window.ipcRenderer = ipcRenderer;
  window.remote = remote;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = mount(<WebWidget />);
    wrapper.instance().webViewRef = webView;

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when state.isSettingOpen === true', () => {
    const wrapper = mount(<WebWidget />);
    wrapper.instance().webViewRef = webView;
    wrapper.setState({
      isMobileHeaderOpen: false,
      isSettingOpen: true,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('test componentWillMount', () => {
    const componentWillMount = jest.spyOn(WebWidget.prototype, 'componentWillMount');
    const on = jest.spyOn(ipcRenderer, 'on');
    const wrapper = mount(<WebWidget />);
    wrapper.instance().webViewRef = webView;


    expect(componentWillMount).toHaveBeenCalledTimes(1);
    expect(on).toHaveBeenCalledTimes(1);
    expect(on).toHaveBeenCalledWith('widget-info', expect.any(Function));
  });

  it('test componnetDidMount and componentUnmount', () => {
    const componentDidMount = jest.spyOn(WebWidget.prototype, 'componentDidMount');
    const componentWillUnmount = jest.spyOn(WebWidget.prototype, 'componentWillUnmount');
    global.document.addEventListener = jest.fn();
    global.document.removeEventListener = jest.fn();
    const wrapper = mount(<WebWidget />);
    wrapper.instance().webViewRef = webView;
    const { setKeyEvent } = wrapper.instance();

    expect(componentDidMount).toHaveBeenCalledTimes(1);
    expect(global.document.addEventListener).toHaveBeenCalledTimes(1);
    expect(global.document.addEventListener).toHaveBeenCalledWith(
      'keydown',
      setKeyEvent,
    );

    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
    expect(global.document.removeEventListener).toHaveBeenCalledTimes(1);
    expect(global.document.removeEventListener).toHaveBeenCalledWith(
      'keydown',
      setKeyEvent,
    );
  });

  describe('should test setKeyEvent', () => {
    const goBack = jest.spyOn(webView, 'goBack');
    const goForward = jest.spyOn(webView, 'goForward');
    const reload = jest.spyOn(webView, 'reload');
    const wrapper = mount(<WebWidget />);
    wrapper.instance().webViewRef = webView;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('when alt + arrowLeft', () => {
      wrapper.instance().setKeyEvent({
        metaKey: true,
        altKey: true,
        keyCode: 37,
      });

      expect(goBack).toHaveBeenCalledTimes(1);
      expect(goBack).toHaveBeenCalledWith();

      wrapper.instance().setKeyEvent({
        altKey: true,
        keyCode: 37,
      });

      expect(goBack).toHaveBeenCalledTimes(2);
      expect(goBack).toHaveBeenCalledWith();
    });

    it('when alt + arrowRight', () => {
      wrapper.instance().setKeyEvent({
        metaKey: true,
        altKey: true,
        keyCode: 39,
      });

      expect(goForward).toHaveBeenCalledTimes(1);
      expect(goForward).toHaveBeenCalledWith();

      wrapper.instance().setKeyEvent({
        altKey: true,
        keyCode: 39,
      });

      expect(goForward).toHaveBeenCalledTimes(2);
      expect(goForward).toHaveBeenCalledWith();
    });

    it('when alt + R', () => {
      wrapper.instance().setKeyEvent({
        metaKey: true,
        altKey: true,
        keyCode: 82,
      });

      expect(reload).toHaveBeenCalledTimes(1);
      expect(reload).toHaveBeenCalledWith();

      wrapper.instance().setKeyEvent({
        altKey: true,
        keyCode: 82,
      });

      expect(reload).toHaveBeenCalledTimes(2);
      expect(reload).toHaveBeenCalledWith();
    });

    it('default', () => {
      wrapper.instance().setKeyEvent({
        altKey: false,
        keyCode: 82,
      });

      expect(goBack).toHaveBeenCalledTimes(0);
      expect(goForward).toHaveBeenCalledTimes(0);
      expect(reload).toHaveBeenCalledTimes(0);
    });
  });

  it('should test toggleIsOnTop', () => {
    const updateWidget = jest.spyOn(utils, 'default');
    const wrapper = mount(<WebWidget />);
    wrapper.instance().webViewRef = webView;

    wrapper.instance().toggleIsOnTop();

    expect(updateWidget).toHaveBeenCalledTimes(1);
    expect(updateWidget).toHaveBeenCalledWith(
      'web',
      {
        isOnTop: true,
      },
    );
  });

  describe('test WebWidget handle function', () => {
    const goBack = jest.spyOn(webView, 'goBack');
    const goForward = jest.spyOn(webView, 'goForward');
    const reload = jest.spyOn(webView, 'reload');
    const stop = jest.spyOn(webView, 'stop');
    const wrapper = mount(<WebWidget />);
    wrapper.instance().webViewRef = webView;

    it('when call handleWidgetGoBack', () => {
      wrapper.instance().handleWidgetGoBack();

      expect(goBack).toHaveBeenCalledTimes(1);
      expect(goBack).toHaveBeenCalledWith();
    });

    it('when call handleWidgetGoFront', () => {
      wrapper.instance().handleWidgetGoForward();

      expect(goForward).toHaveBeenCalledTimes(1);
      expect(goForward).toHaveBeenCalledWith();
    });

    it('when call handleWidgetRefresh', () => {
      wrapper.instance().handleWidgetRefresh();

      expect(reload).toHaveBeenCalledTimes(1);
      expect(reload).toHaveBeenCalledWith();
    });

    it('when call handleWidgetStopRefresh', () => {
      wrapper.instance().handleWidgetStopRefresh();

      expect(stop).toHaveBeenCalledTimes(1);
      expect(stop).toHaveBeenCalledWith();
    });
  });

  describe('test handleToggleSettingMenu', () => {
    const wrapper = mount(<WebWidget />);

    beforeEach(() => {
      wrapper.instance().webViewRef = webView;
    });

    it('when toggle state.isSettingOpen', () => {
      wrapper.instance().handleToggleSettingMenu();
      expect(wrapper.state().isSettingOpen).toBe(true);
      wrapper.instance().webViewRef = webView;
      wrapper.instance().handleToggleSettingMenu();
      expect(wrapper.state().isSettingOpen).toBe(false);
    });

    it('when set state.isSettingOpen = true ', () => {
      wrapper.instance().handleToggleSettingMenu(true);
      expect(wrapper.state().isSettingOpen).toBe(true);
    });

    it('when set state.isSettingOpen = false', () => {
      wrapper.instance().handleToggleSettingMenu(false);
      expect(wrapper.state().isSettingOpen).toBe(false);
    });
  });
});
