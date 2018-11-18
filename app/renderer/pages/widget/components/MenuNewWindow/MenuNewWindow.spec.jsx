import React from 'react';
import { mount } from 'enzyme';
import { shell } from 'electron';
import MenuNewWindow from '.';

describe('<MenuNewWindow />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = mount(<MenuNewWindow widget={{}} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should test componentDidMount', () => {
    const componentDidMount = jest.spyOn(MenuNewWindow.prototype, 'componentDidMount');
    const componentWillUnmount = jest.spyOn(MenuNewWindow.prototype, 'componentWillUnmount');
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    const wrapper = mount(<MenuNewWindow widget={{}} />);
    const { handleClose } = wrapper.instance();

    expect(componentDidMount).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledWith(
      'mouseup',
      handleClose,
    );
    expect(window.addEventListener).toHaveBeenCalledWith(
      'resize',
      handleClose,
    );

    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'mouseup',
      handleClose,
    );
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'resize',
      handleClose,
    );
  });

  it('should call handleClose', () => {
    const onClose = jest.fn();
    const wrapper = mount(<MenuNewWindow widget={{}} onClose={onClose} />);

    wrapper.instance().handleClose();

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith();
  });

  it('should call handleOpenBrowser', () => {
    const wrapper = mount(
      <MenuNewWindow
        url="mock-url"
        widget={{}}
      />,
    );

    wrapper.instance().handleOpenBrowser();

    expect(shell.openExternal).toHaveBeenCalledTimes(1);
    expect(shell.openExternal).toHaveBeenCalledWith('mock-url');
  });

  it('should call handleMovementPage', () => {
    const loadURL = jest.fn();
    const widget = {
      loadURL,
    };
    const wrapper = mount(
      <MenuNewWindow
        url="mock-url"
        widget={widget}
      />,
    );

    wrapper.instance().handleMovementPage();

    expect(loadURL).toHaveBeenCalledTimes(1);
    expect(loadURL).toHaveBeenCalledWith('mock-url');
  });
});
