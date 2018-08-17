import React from 'react';
import { shallow } from 'enzyme';

import AddressBar from '.';

describe('<AddressBar />', () => {
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
    const wrapper = shallow(<AddressBar isLoading />);
    wrapper.setState({ isMenuOpen: true });

    expect(wrapper).toMatchSnapshot();
  });

  describe('should test componentDidMount', () => {
    const componentDidMount = jest.spyOn(AddressBar.prototype, 'componentDidMount');
    const componentWillUnmount = jest.spyOn(AddressBar.prototype, 'componentWillUnmount');
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();

    it('when webView exist', () => {
      const wrapper = shallow(<AddressBar webView={webView} />);
      const {
        handleAttachAddressFocusHotKey,
        handleAttachReloadHotKey,
      } = wrapper.instance();

      expect(componentDidMount).toHaveBeenCalledTimes(1);
      expect(document.addEventListener).toHaveBeenCalledTimes(2);
      expect(document.addEventListener).toHaveBeenCalledWith(
        'keydown',
        handleAttachAddressFocusHotKey,
      );
      expect(document.addEventListener).toHaveBeenCalledWith(
        'keydown',
        handleAttachReloadHotKey,
      );

      wrapper.unmount();

      expect(componentWillUnmount).toHaveBeenCalledTimes(1);
      expect(document.removeEventListener).toHaveBeenCalledTimes(2);
      expect(document.removeEventListener).toHaveBeenCalledWith(
        'keydown',
        handleAttachAddressFocusHotKey,
      );
      expect(document.removeEventListener).toHaveBeenCalledWith(
        'keydown',
        handleAttachReloadHotKey,
      );
    });

    it('when webView don\'t exist', () => {
      const wrapper = shallow(<AddressBar />);

      expect(componentDidMount).toHaveBeenCalledTimes(1);
      expect(document.addEventListener).toHaveBeenCalledTimes(1);
      expect(document.addEventListener).toHaveBeenCalledWith(
        'keydown',
        wrapper.instance().handleAttachAddressFocusHotKey,
      );
    });
  });

  describe('test componentDidUpdate', () => {
    document.addEventListener = jest.fn();
    const componentDidUpdate = jest.spyOn(AddressBar.prototype, 'componentDidUpdate');
    const wrapper = shallow(<AddressBar />);

    it('should call addEventListener', () => {
      expect(document.addEventListener).toHaveBeenCalledTimes(0);
      expect(componentDidUpdate).toHaveBeenCalledTimes(0);
      wrapper.setProps({ webView });

      expect(componentDidUpdate).toHaveBeenCalledTimes(1);
      expect(document.addEventListener).toHaveBeenCalledTimes(1);
      expect(document.addEventListener).toHaveBeenCalledWith(
        'keydown',
        wrapper.instance().handleAttachReloadHotKey,
      );
    });

    it('should change state', () => {
      expect(wrapper.instance().state.addressValue).toBe('');
      expect(componentDidUpdate).toHaveBeenCalledTimes(0);

      wrapper.setProps({ currentUrl: 'mock' });

      expect(componentDidUpdate).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().state.addressValue).toBe('mock');
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
        ctrlKey: true,
        metaKey: true,
        key: 'l',
      };

      wrapper.instance().handleAttachAddressFocusHotKey(event);
      expect(select).toHaveBeenCalledTimes(1);
    });

    it('when press metaKey + ㅣ(korean)', () => {
      const event = {
        ctrlKey: true,
        metaKey: true,
        key: 'ㅣ',
      };

      wrapper.instance().handleAttachAddressFocusHotKey(event);
      expect(select).toHaveBeenCalledTimes(1);
    });

    it('when press metaKey + another key in macOS', () => {
      const event = {
        ctrlKey: true,
        metaKey: true,
        key: 'a',
      };

      wrapper.instance().handleAttachAddressFocusHotKey(event);
      expect(select).toHaveBeenCalledTimes(0);
    });
  });

  describe('test handleAttachReloadHotKey', () => {
    const wrapper = shallow(<AddressBar webView={webView} />);

    it('when press metaKey + r', () => {
      const event = {
        altKey: true,
        metaKey: true,
        key: 'r',
      };

      wrapper.instance().handleAttachReloadHotKey(event);
      expect(webView.reload).toHaveBeenCalledTimes(1);
    });

    it('when press metaKey + ㄱ(korean)', () => {
      const event = {
        altKey: true,
        metaKey: true,
        key: 'ㄱ',
      };

      wrapper.instance().handleAttachReloadHotKey(event);
      expect(webView.reload).toHaveBeenCalledTimes(1);
    });

    it('when press metaKey + another key', () => {
      const event = {
        altKey: true,
        metaKey: true,
        key: 'a',
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

      expect(wrapper.instance().state.addressValue).toBe('google.com');
      wrapper.instance().handleAddressEnter({ key: 'Enter' });

      expect(wrapper.instance().state.addressValue).toBe('https://google.com');
      expect(webView.loadURL).toHaveBeenCalledTimes(1);
      expect(webView.loadURL).toHaveBeenCalledWith('https://google.com');
    });

    it('when doesn\'t press enter key', () => {
      wrapper.setState({
        addressValue: 'google.com',
      });

      expect(wrapper.instance().state.addressValue).toBe('google.com');
      wrapper.instance().handleAddressEnter({ key: 'a' });

      expect(wrapper.instance().state.addressValue).toBe('google.com');
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
    expect(wrapper.instance().state.addressValue).toBe('https://google.com');
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
    expect(webView.reload).toHaveBeenCalledWith();
    expect(wrapper.instance().state.addressValue).toBe('https://google.com');
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
