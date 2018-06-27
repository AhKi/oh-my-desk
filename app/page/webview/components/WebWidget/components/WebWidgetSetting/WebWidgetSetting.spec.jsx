import React from 'react';
import { shallow } from 'enzyme';

import * as IPC from 'constants/ipc';
import * as utils from 'utils/updateWidget';
import * as widgetName from 'utils/validation/widgetName';
import * as widgetUrl from 'utils/validation/widgetUrl';
import WebWidgetSetting from '.';

describe('<WebWidgetSetting />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WebWidgetSetting />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should change state when change props', () => {
    const componentWillReceiveProps = jest.spyOn(WebWidgetSetting.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(
      <WebWidgetSetting
        name="initial-name"
        url="initial-url"
      />,
    );

    wrapper.setProps({
      name: 'mock-name',
      url: 'mock-url',
    });
    expect(componentWillReceiveProps).toHaveBeenCalledTimes(1);
    expect(wrapper.state().name).toBe('mock-name');
    expect(wrapper.state().url).toBe('mock-url');
  });

  it('should call window.ipcRenderer.send when call openManageView', () => {
    const ipcRenderer = {
      send() {},
    };
    const send = jest.spyOn(ipcRenderer, 'send');
    window.ipcRenderer = ipcRenderer;
    const wrapper = shallow(<WebWidgetSetting />);

    wrapper.instance().openManageView();

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(IPC.WIDGET_MANAGER_OPEN);
  });

  it('should change state when call handleChangeName', () => {
    const validationName = jest
      .spyOn(widgetName, 'default')
      .mockImplementation(() => 'mock-validation-name');
    const wrapper = shallow(<WebWidgetSetting />);

    wrapper.instance().handleChangeName({
      target: {
        value: 'mock-name',
      },
    });

    expect(wrapper.state().name).toBe('mock-name');
    expect(validationName).toHaveBeenCalledTimes(1);
    expect(validationName).toHaveBeenCalledWith('mock-name');
    expect(wrapper.state().nameError).toBe('mock-validation-name');
  });

  it('should change state when call handleChangeName', () => {
    const validationUrl = jest
      .spyOn(widgetUrl, 'default')
      .mockImplementation(() => 'mock-validation-url');
    const wrapper = shallow(<WebWidgetSetting />);

    wrapper.instance().handleChangeUrl({
      target: {
        value: 'mock-name',
      },
    });

    expect(wrapper.state().url).toBe('mock-name');
    expect(validationUrl).toHaveBeenCalledTimes(1);
    expect(validationUrl).toHaveBeenCalledWith('mock-name');
    expect(wrapper.state().urlError).toBe('mock-validation-url');
  });

  describe('test handleSubmit', () => {
    const event = {
      preventDefault() {},
    };
    const onToggleSetting = jest.fn();
    const updateWidget = jest.spyOn(utils, 'default');
    const wrapper = shallow(
      <WebWidgetSetting
        onToggleSetting={onToggleSetting}
      />,
    );

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('when name, url is matched', () => {
      wrapper.setState({
        name: 'mock-name',
        nameError: '',
        url: 'https://google.com',
        urlError: '',
      });

      wrapper.instance().handleSubmit(event);

      expect(onToggleSetting).toHaveBeenCalledTimes(1);
      expect(onToggleSetting).toHaveBeenCalledWith(false);
      expect(updateWidget).toHaveBeenCalledTimes(1);
      expect(updateWidget).toHaveBeenCalledWith(
        'web',
        {
          name: 'mock-name',
          url: 'https://google.com',
        },
      );
    });

    it('when name, url is not matched', () => {
      wrapper.setState({
        name: 'mock-name',
        nameError: 'mock-name-error',
        url: 'https://google.com',
        urlError: 'mock-url-error',
      });

      wrapper.instance().handleSubmit(event);

      expect(onToggleSetting).toHaveBeenCalledTimes(0);
      expect(updateWidget).toHaveBeenCalledTimes(0);
    });
  });
});
