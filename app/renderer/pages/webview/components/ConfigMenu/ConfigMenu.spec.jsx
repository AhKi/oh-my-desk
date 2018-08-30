import React from 'react';
import { shallow, mount } from 'enzyme';
import { shell, remote } from 'electron';
import DeleteWidgetConfirmContainer from '../../containers/DeleteWidgetConfirmContainer';
import ConfigMenu from './index';

describe('<ConfigMenu />', () => {
  remote.getGlobal = jest.fn(() => () => JSON.stringify({ status: { lang: 'English' } }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<ConfigMenu />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when isReloadMenu === true', () => {
    const wrapper = shallow(<ConfigMenu />);
    wrapper.setState({ isOpenReloadMenu: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('should test componentDidMount and componentWillUnmount', () => {
    const componentDidMount = jest.spyOn(ConfigMenu.prototype, 'componentDidMount');
    const componentWillUnmount = jest.spyOn(ConfigMenu.prototype, 'componentWillUnmount');

    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();
    const wrapper = shallow(<ConfigMenu />);
    const { handleOutSideClick } = wrapper.instance();

    expect(componentDidMount).toHaveBeenCalledTimes(1);
    expect(document.addEventListener).toHaveBeenCalledTimes(1);
    expect(document.addEventListener).toHaveBeenCalledWith(
      'mouseup',
      handleOutSideClick,
    );

    wrapper.unmount();

    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
    expect(document.removeEventListener).toHaveBeenCalledTimes(1);
    expect(document.removeEventListener).toHaveBeenCalledWith(
      'mouseup',
      handleOutSideClick,
    );
  });

  it('should call handleDeleteWidget', () => {
    const onModalOpen = jest.fn();
    const onClose = jest.fn();
    const wrapper = shallow(
      <ConfigMenu
        onClose={onClose}
        onModalOpen={onModalOpen}
      />,
    );

    wrapper.instance().handleDeleteWidget();

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith();
    expect(onModalOpen).toHaveBeenCalledTimes(1);
    expect(onModalOpen).toHaveBeenCalledWith(DeleteWidgetConfirmContainer);
  });

  describe('should call handleOutSideClick', () => {
    const buttonRef = {
      current: {
        contains: () => false,
      },
    };
    const onClose = jest.fn();

    it('when click outside', () => {
      const wrapper = mount(
        <ConfigMenu
          buttonRef={buttonRef}
          onClose={onClose}
        />,
      );
      wrapper.instance().menuContainerRef.current.contains = () => false;

      wrapper.instance().handleOutSideClick({ target: null });

      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith(false);
    });

    it('when click inSide', () => {
      const wrapper = mount(
        <ConfigMenu
          buttonRef={buttonRef}
          onClose={onClose}
        />,
      );
      wrapper.instance().menuContainerRef.current.contains = () => true;

      wrapper.instance().handleOutSideClick({ target: null });

      expect(onClose).toHaveBeenCalledTimes(0);
    });
  });

  it('should call handleToggleReloadMenu', () => {
    const wrapper = shallow(<ConfigMenu />);

    wrapper.instance().handleToggleReloadMenu();

    expect(wrapper.instance().state.isOpenReloadMenu).toBe(true);

    wrapper.instance().handleToggleReloadMenu();

    expect(wrapper.instance().state.isOpenReloadMenu).toBe(false);
  });

  it('should call handleOpenWithBrowser', () => {
    shell.openExternal = jest.fn();
    const onClose = jest.fn();
    const wrapper = shallow(
      <ConfigMenu
        currentUrl="https://google.com"
        onClose={onClose}
      />,
    );

    wrapper.instance().handleOpenWithBrowser();

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(shell.openExternal).toHaveBeenCalledTimes(1);
    expect(shell.openExternal).toHaveBeenCalledWith('https://google.com');
  });

  it('should call handleSetReloadInterval', () => {
    const onUpdateWidgetInfo = jest.fn();
    const wrapper = shallow(<ConfigMenu id="mock-id" onUpdateWidgetInfo={onUpdateWidgetInfo} />);

    wrapper.instance().handleSetReloadInterval(50);

    expect(onUpdateWidgetInfo).toHaveBeenCalledTimes(1);
    expect(onUpdateWidgetInfo).toHaveBeenCalledWith(
      'mock-id',
      {
        reloadInterval: 50,
      },
    );
  });

  it('should call handleChangeLocalSecond', () => {
    const handleSetReloadInterval = jest.spyOn(ConfigMenu.prototype, 'handleSetReloadInterval');
    const wrapper = shallow(<ConfigMenu />);

    wrapper.instance().handleChangeLocalSecond({ target: { value: 50 } });

    expect(wrapper.instance().state.localSecond).toBe(50);
    expect(handleSetReloadInterval).toHaveBeenCalledTimes(1);
    expect(handleSetReloadInterval).toHaveBeenCalledWith(50);
  });

  it('should click interval-zero-btn', () => {
    const handleSetReloadInterval = jest.spyOn(ConfigMenu.prototype, 'handleSetReloadInterval');
    const wrapper = shallow(<ConfigMenu />);
    wrapper.setState({ isOpenReloadMenu: true });

    const btn = wrapper.find('[data-name="interval-zero-btn"]');

    btn.simulate('click');

    expect(handleSetReloadInterval).toHaveBeenCalledTimes(1);
    expect(handleSetReloadInterval).toHaveBeenCalledWith(0);
  });

  it('should click set-interval-btn', () => {
    const handleSetReloadInterval = jest.spyOn(ConfigMenu.prototype, 'handleSetReloadInterval');
    const wrapper = shallow(<ConfigMenu />);
    wrapper.setState({
      isOpenReloadMenu: true,
      localSecond: 50,
    });

    const btn = wrapper.find('[data-name="set-interval-btn"]');

    btn.simulate('click');

    expect(handleSetReloadInterval).toHaveBeenCalledTimes(1);
    expect(handleSetReloadInterval).toHaveBeenCalledWith(50);
  });
});
