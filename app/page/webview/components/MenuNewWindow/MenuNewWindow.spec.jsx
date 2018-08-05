import React from 'react';
import { shallow } from 'enzyme';
import { shell, remote } from 'electron';
import MenuNewWindow from '.';

describe('<MenuNewWindow />', () => {
  remote.getGlobal = jest.fn(() => () => JSON.stringify({ status: { lang: 'English' } }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<MenuNewWindow />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should test componentDidMount', () => {
    const componentDidMount = jest.spyOn(MenuNewWindow.prototype, 'componentDidMount');
    const componentWillUnmount = jest.spyOn(MenuNewWindow.prototype, 'componentWillUnmount');
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    const wrapper = shallow(<MenuNewWindow />);
    const { handleClose } = wrapper.instance();

    expect(componentDidMount).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledWith(
      'mouseup',
      handleClose,
    );

    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
    expect(window.removeEventListener).toHaveBeenCalledTimes(1);
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'mouseup',
      handleClose,
    );
  });

  it('should call handleClose', () => {
    const onClose = jest.fn();
    const wrapper = shallow(<MenuNewWindow onClose={onClose} />);

    wrapper.instance().handleClose();

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith();
  });

  it('should call handleOpenBrowser', () => {
    const wrapper = shallow(
      <MenuNewWindow
        url="mock-url"
      />,
    );

    wrapper.instance().handleOpenBrowser();

    expect(shell.openExternal).toHaveBeenCalledTimes(1);
    expect(shell.openExternal).toHaveBeenCalledWith('mock-url');
  });

  it('should call handleMovementPage', () => {
    const loadURL = jest.fn();
    const webview = {
      loadURL,
    };
    const wrapper = shallow(
      <MenuNewWindow
        url="mock-url"
        webview={webview}
      />,
    );

    wrapper.instance().handleMovementPage();

    expect(loadURL).toHaveBeenCalledTimes(1);
    expect(loadURL).toHaveBeenCalledWith('mock-url');
  });
});
