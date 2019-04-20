import React from 'react';
import { shallow } from 'enzyme';
import os from 'os';

import AddressBar from '.';

jest.mock('os');

describe('<AddressBar />', () => {
  const platform = jest.spyOn(os, 'platform');
  platform.mockImplementation(() => 'darwin');

  const webView = {
    reload: jest.fn(),
    loadURL: jest.fn(),
    goBack: jest.fn(),
    goForward: jest.fn(),
    stop: jest.fn(),
    canGoBack: () => false,
    canGoForward: () => false,
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<AddressBar />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when props.isLoading is true', () => {
    const wrapper = shallow(<AddressBar isLoading />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when state.isMenuOpen is true', () => {
    const wrapper = shallow(<AddressBar />);
    wrapper.setState({ isMenuOpen: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when state.isMouseOverInput true', () => {
    const wrapper = shallow(<AddressBar />);
    wrapper.setState({ isMouseOverInput: true });

    expect(wrapper).toMatchSnapshot();
  });

  describe('test react lifecycle', () => {
    const componentDidMount = jest.spyOn(AddressBar.prototype, 'componentDidMount');
    const componentWillUnmount = jest.spyOn(AddressBar.prototype, 'componentWillUnmount');
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();

    it('should handle componentDidMount & componentWillUnmount', () => {
      const wrapper = shallow(<AddressBar webView={webView} />);
      const { configureKeyDownEvent } = wrapper.instance();

      expect(componentDidMount).toHaveBeenCalledTimes(1);
      expect(document.addEventListener).toHaveBeenCalledTimes(1);
      expect(document.addEventListener).toHaveBeenCalledWith(
        'keydown',
        configureKeyDownEvent,
      );

      wrapper.unmount();

      expect(componentWillUnmount).toHaveBeenCalledTimes(1);
      expect(document.removeEventListener).toHaveBeenCalledTimes(1);
      expect(document.removeEventListener).toHaveBeenCalledWith(
        'keydown',
        configureKeyDownEvent,
      );
    });

    describe('should handle componentDidUpdate', () => {
      const componentDidUpdate = jest.spyOn(AddressBar.prototype, 'componentDidUpdate');
      const wrapper = shallow(<AddressBar />);

      it('should change state', () => {
        expect(wrapper.instance().state.addressValue).toBe('');
        expect(componentDidUpdate).toHaveBeenCalledTimes(0);

        wrapper.setProps({ currentUrl: 'mock' });

        expect(componentDidUpdate).toHaveBeenCalledTimes(2);
        expect(wrapper.instance().state.addressValue).toBe('mock');
      });
    });
  });

  describe('test handleAttachAddressFocusHotKey', () => {
    const select = jest.fn();
    const blur = jest.fn();
    const wrapper = shallow(<AddressBar />);
    wrapper.instance().addressInputRef.current = {
      select,
      blur,
    };

    it('when press metaKey + l', () => {
      const event = {
        metaKey: true,
        keyCode: 76,
      };

      wrapper.instance().handleAttachAddressFocusHotKey(event);
      expect(select).toHaveBeenCalledTimes(1);
    });

    it('when press another key', () => {
      const event = {
        metaKey: true,
        keyCode: 77,
      };

      wrapper.instance().handleAttachAddressFocusHotKey(event);
      expect(select).toHaveBeenCalledTimes(0);
      expect(blur).toHaveBeenCalledTimes(0);
    });

    it('when press ESC key', () => {
      const event = {
        keyCode: 27,
      };

      wrapper.instance().handleAttachAddressFocusHotKey(event);
      expect(blur).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle configureKeyDownEvent', () => {
    const wrapper = shallow(<AddressBar webView={webView} />);
    const handleAttachAddressFocusHotKey = jest.fn();
    const handleAttachReloadHotKey = jest.fn();
    const e = { event: 'mock-event' };

    wrapper.instance().handleAttachReloadHotKey = handleAttachReloadHotKey;
    wrapper.instance().handleAttachAddressFocusHotKey = handleAttachAddressFocusHotKey;

    wrapper.instance().configureKeyDownEvent(e);

    expect(handleAttachReloadHotKey).toHaveBeenNthCalledWith(1, e);
    expect(handleAttachAddressFocusHotKey).toHaveBeenNthCalledWith(1, e);
  });

  describe('test handleAttachReloadHotKey', () => {
    const wrapper = shallow(<AddressBar webView={webView} />);

    it('when press metaKey + r', () => {
      const event = {
        metaKey: true,
        keyCode: 82,
      };

      wrapper.instance().handleAttachReloadHotKey(event);
      expect(webView.reload).toHaveBeenCalledTimes(1);
    });

    it('when press metaKey + another key', () => {
      const event = {
        metaKey: true,
        keyCode: 83,
      };

      wrapper.instance().handleAttachReloadHotKey(event);
      expect(webView.reload).toHaveBeenCalledTimes(0);
    });
  });

  it('should call handleAddressChange', () => {
    const event = {
      target: {
        value: 'mock-value',
      },
    };
    const wrapper = shallow(<AddressBar />);

    expect(wrapper.instance().state.addressValue).toBe('');

    wrapper.instance().handleAddressChange(event);

    expect(wrapper.instance().state.addressValue).toBe('mock-value');
  });

  describe('test call handleAddressEnter', () => {
    const wrapper = shallow(<AddressBar webView={webView} />);

    it('when addressValue has https://', () => {
      wrapper.setState({
        addressValue: 'https://google.com',
      });

      wrapper.instance().handleAddressEnter({ key: 'Enter' });

      expect(webView.loadURL).toHaveBeenCalledTimes(1);
      expect(webView.loadURL).toHaveBeenCalledWith('https://google.com');
    });

    it('when addressValue doesn\'t have https://', () => {
      wrapper.setState({
        addressValue: 'google.com',
      });

      wrapper.instance().handleAddressEnter({ key: 'Enter' });

      expect(webView.loadURL).toHaveBeenCalledTimes(1);
      expect(webView.loadURL).toHaveBeenCalledWith('http://google.com');
    });

    it('when addressValue doesn\'t url', () => {
      wrapper.setState({
        addressValue: 'google',
      });

      wrapper.instance().handleAddressEnter({ key: 'Enter' });

      expect(webView.loadURL).toHaveBeenCalledTimes(1);
      expect(webView.loadURL).toHaveBeenCalledWith('https://www.google.com/search?q=google');
    });

    it('when doesn\'t press enter key', () => {
      wrapper.setState({
        addressValue: 'google.com',
      });

      wrapper.instance().handleAddressEnter({ key: 'a' });

      expect(webView.loadURL).toHaveBeenCalledTimes(0);
    });
  });

  it('should call handleNavigateToHome', () => {
    const wrapper = shallow(
      <AddressBar
        homeUrl="https://google.com"
        webView={webView}
      />,
    );
    wrapper.setState({ addressValue: 'mock-value' });

    wrapper.instance().handleNavigateToHome();

    expect(webView.loadURL).toHaveBeenCalledTimes(1);
    expect(webView.loadURL).toHaveBeenCalledWith('https://google.com');
  });

  it('should call handleNavigateReload', () => {
    const wrapper = shallow(
      <AddressBar
        currentUrl="https://google.com"
        webView={webView}
      />,
    );
    wrapper.setState({ addressValue: 'mock-value' });

    wrapper.instance().handleNavigateReload();

    expect(webView.reload).toHaveBeenCalledTimes(1);
  });

  it('should call handleToggleIsOnTop', () => {
    const onUpdateWidgetInfo = jest.fn();
    const wrapper = shallow(
      <AddressBar
        id="mock-id"
        isOnTop={false}
        onUpdateWidgetInfo={onUpdateWidgetInfo}
      />,
    );

    wrapper.instance().handleToggleIsOnTop();

    expect(onUpdateWidgetInfo).toHaveBeenCalledTimes(1);
    expect(onUpdateWidgetInfo).toHaveBeenCalledWith(
      'mock-id',
      {
        isOnTop: true,
      },
    );
  });

  it('should call handleToggleMenu', () => {
    const wrapper = shallow(<AddressBar />);

    wrapper.instance().handleToggleMenu();
    expect(wrapper.instance().state.isMenuOpen).toBe(true);

    wrapper.instance().handleToggleMenu(false);
    expect(wrapper.instance().state.isMenuOpen).toBe(false);

    wrapper.instance().handleToggleMenu(true);
    expect(wrapper.instance().state.isMenuOpen).toBe(true);

    wrapper.instance().handleToggleMenu();
    expect(wrapper.instance().state.isMenuOpen).toBe(false);

    wrapper.setProps({ isMakeProgress: true });
    wrapper.instance().handleToggleMenu();
    expect(wrapper.instance().state.isMenuOpen).toBe(false);
  });

  describe('should test inline function', () => {
    const wrapper = shallow(<AddressBar isLoading webView={webView} />);

    it('should call webView.goBack()', () => {
      const btn = wrapper.find('[data-name="go-back-btn"]');

      btn.simulate('click');

      expect(webView.goBack).toHaveBeenCalledTimes(1);
    });

    it('should call webView.goBack()', () => {
      const btn = wrapper.find('[data-name="go-forward-btn"]');

      btn.simulate('click');

      expect(webView.goForward).toHaveBeenCalledTimes(1);
    });

    it('should call webView.goBack()', () => {
      const btn = wrapper.find('[data-name="stop-btn"]');

      btn.simulate('click');

      expect(webView.stop).toHaveBeenCalledTimes(1);
    });
  });
});
