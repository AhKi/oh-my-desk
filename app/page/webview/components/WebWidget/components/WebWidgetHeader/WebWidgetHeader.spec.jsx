import React from 'react';
import { shallow } from 'enzyme';

import WebWidgetHeader from './';

describe('<WebWidgetHeader />', () => {
  const remote = {
    getCurrentWindow: () => {},
  };
  const webView = {
    canGoBack() {},
    canGoForward() {},
  };
  const widget = {
    close() {},
    minimize() {},
    maximize() {},
    unmaximize() {},
    isMaximized() {},
  };

  window.remote = remote;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WebWidgetHeader webView={webView} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('test instance of WebWidgetHeader', () => {
    const close = jest.spyOn(widget, 'close');
    const minimize = jest.spyOn(widget, 'minimize');
    const maximize = jest.spyOn(widget, 'maximize');
    const unmaximize = jest.spyOn(widget, 'unmaximize');
    const wrapper = shallow(<WebWidgetHeader webView={webView} />);
    wrapper.instance().widget = widget;

    it('when call handleWidgetMinimize', () => {
      wrapper.instance().handleWidgetMinimize();

      expect(minimize).toHaveBeenCalledTimes(1);
      expect(minimize).toHaveBeenCalledWith();
    });

    it('when call handleWidgetToggleMaximize', () => {
      wrapper.instance().handleWidgetToggleMaximize();

      expect(maximize).toHaveBeenCalledTimes(1);
      expect(maximize).toHaveBeenCalledWith();

      wrapper.instance().widget.isMaximized = () => true;
      wrapper.instance().handleWidgetToggleMaximize();
      expect(unmaximize).toHaveBeenCalledTimes(1);
      expect(unmaximize).toHaveBeenCalledWith();
    });

    it('when call handleWidgetClose', () => {
      wrapper.instance().handleWidgetClose();

      expect(close).toHaveBeenCalledTimes(1);
      expect(close).toHaveBeenCalledWith();
    });
  });
});
