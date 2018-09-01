import React from 'react';
import { remote } from 'electron';
import { shallow, mount } from 'enzyme';
import UpdateWindow from './UpdateWindow';

describe('<UpdateWindow />', () => {
  remote.getGlobal = jest.fn(() => () => JSON.stringify({ config: { language: 'English' } }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<UpdateWindow />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('should call handleChangeAutoUpdate', () => {
    const wrapper = shallow(<UpdateWindow />);

    it('when state.autoUpdate is false', () => {
      wrapper.setState({ isDownloadUpdateWhenStart: false });
      expect(wrapper.instance().state.isDownloadUpdateWhenStart).toBe(false);
      wrapper.instance().handleChangeAutoUpdate();
      expect(wrapper.instance().state.isDownloadUpdateWhenStart).toBe(true);
    });

    it('when state.autoUpdate is true', () => {
      wrapper.setState({ isDownloadUpdateWhenStart: true });
      expect(wrapper.instance().state.isDownloadUpdateWhenStart).toBe(true);
      wrapper.instance().handleChangeAutoUpdate();
      expect(wrapper.instance().state.isDownloadUpdateWhenStart).toBe(false);
    });
  });

  it('should call handleSkipVersion', () => {
    const onSkipThisVersion = jest.fn();
    const handleWindowClose = jest.spyOn(UpdateWindow.prototype, 'handleWindowClose');
    const wrapper = mount(
      <UpdateWindow
        newVersion="new-version"
        onSkipThisVersion={onSkipThisVersion}
      />,
    );
    wrapper.instance().widget = {
      close: jest.fn(),
    };

    wrapper.instance().handleSkipVersion();

    expect(handleWindowClose).toHaveBeenCalledTimes(1);
    expect(handleWindowClose).toHaveBeenCalledWith();
    expect(onSkipThisVersion).toHaveBeenCalledTimes(1);
    expect(onSkipThisVersion).toHaveBeenCalledWith('new-version');
  });

  describe('should call handleInstallUpdate', () => {
    const onInstallRequest = jest.fn();
    const handleWindowClose = jest.spyOn(UpdateWindow.prototype, 'handleWindowClose');
    const wrapper = mount(
      <UpdateWindow
        newVersion="new-version"
        onInstallRequest={onInstallRequest}
      />,
    );

    wrapper.instance().widget = {
      close: jest.fn(),
    };

    it('when isDownloadFetch === true', () => {
      wrapper.setProps({ isDownloadFetch: true });

      wrapper.instance().handleInstallUpdate();

      expect(onInstallRequest).toHaveBeenCalledTimes(0);
      expect(handleWindowClose).toHaveBeenCalledTimes(1);
      expect(handleWindowClose).toHaveBeenCalledWith();
    });

    it('when isDownloadFetch === false', () => {
      wrapper.setProps({ isDownloadFetch: false });

      wrapper.instance().handleInstallUpdate();

      expect(onInstallRequest).toHaveBeenCalledTimes(1);
      expect(onInstallRequest).toHaveBeenCalledWith();
      expect(handleWindowClose).toHaveBeenCalledTimes(1);
      expect(handleWindowClose).toHaveBeenCalledWith();
    });
  });

  it('should call handleWindowClose', () => {
    const onSetAutoUpdate = jest.fn();
    const close = jest.fn();
    const wrapper = shallow(<UpdateWindow onSetAutoUpdate={onSetAutoUpdate} />);
    wrapper.instance().widget = {
      close,
    };

    wrapper.instance().handleWindowClose();

    expect(onSetAutoUpdate).toHaveBeenCalledTimes(1);
    expect(onSetAutoUpdate)
      .toHaveBeenCalledWith(wrapper.instance().state.isDownloadUpdateWhenStart);
    expect(close).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledWith();
  });
});
