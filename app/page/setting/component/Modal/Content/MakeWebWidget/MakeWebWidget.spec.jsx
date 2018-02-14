import React from 'react';
import { shallow } from 'enzyme';

import MakeWebWidget from './MakeWebWidget';

describe('<MakeWebWidget />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<MakeWebWidget />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when exist error', () => {
    const wrapper = shallow(<MakeWebWidget />);
    wrapper.setState({
      widgetName: 'mock-name',
      nameError: 'mock-error',
      widgetUrl: 'mock-url',
      urlError: 'mock-error',
    });

    expect(wrapper).toMatchSnapshot();
  });

  describe('test validateCheck', () => {
    const wrapper = shallow(<MakeWebWidget />);

    describe('when check validation of name', () => {
      it('when widgetName.length === 0', () => {
        wrapper.setState({ widgetName: '' });
        wrapper.instance().validateCheck('name');

        expect(wrapper.state().nameError).toBe('Please enter the widget name.');
      });

      it('when widgetName is corrected', () => {
        wrapper.setState({ widgetName: 'mock-name' });
        wrapper.instance().validateCheck('name');

        expect(wrapper.state().nameError).toBe('');
      });
    });

    describe('when check validation of url', () => {
      it('when widgetUrl.length === 0', () => {
        wrapper.setState({ widgetUrl: '' });
        wrapper.instance().validateCheck('url');

        expect(wrapper.state().urlError).toBe('Please enter the widget url.');
      });

      it('when widgetUrl is not url pattern', () => {
        wrapper.setState({ widgetUrl: 'widget-url' });
        wrapper.instance().validateCheck('url');

        expect(wrapper.state().urlError).toBe('Please match the URL format. (ex: https://www.google.com)');
      });

      it('when widgetUrl is corrected', () => {
        wrapper.setState({ widgetUrl: 'https://www.google.com' });
        wrapper.instance().validateCheck('url');

        expect(wrapper.state().urlError).toBe('');
      });
    });

    it('when total type check', () => {
      wrapper.setState({
        widgetUrl: 'https://www.google.com',
        widgetName: 'mock-name',
        nameError: 'mock-error',
        urlError: 'mock-error',
      });
      wrapper.instance().validateCheck('total');

      expect(wrapper.state().nameError).toBe('');
      expect(wrapper.state().urlError).toBe('');
    });

    it('when total type check', () => {
      wrapper.setState({
        widgetUrl: 'https://www.google.com',
        widgetName: 'mock-name',
        nameError: 'mock-error',
        urlError: 'mock-error',
      });
      wrapper.instance().validateCheck('total');

      expect(wrapper.state().nameError).toBe('');
      expect(wrapper.state().urlError).toBe('');
    });

    it('when type is default', () => {
      wrapper.setState({
        widgetUrl: 'https://www.google.com',
        widgetName: 'mock-name',
        nameError: 'mock-error',
        urlError: 'mock-error',
      });
      wrapper.instance().validateCheck('mock');

      expect(wrapper.state().nameError).toBe('mock-error');
      expect(wrapper.state().urlError).toBe('mock-error');
    });
  });

  describe('test handleCreateWidget', () => {
    const mockIpcRenderer = window.ipcRenderer;
    const ipcRenderer = {
      send: () => {},
    };
    window.ipcRenderer = ipcRenderer;
    const event = {
      preventDefault: () => {},
    };
    const onModalClose = jest.fn();
    const validateCheck = jest.spyOn(MakeWebWidget.prototype, 'validateCheck');
    const wrapper = shallow(<MakeWebWidget onModalClose={onModalClose} />);

    beforeEach(() => {
      onModalClose.mockClear();
      validateCheck.mockClear();
    });

    // Todo test when called default

    it('when widgetName and widgetUrl is not corrected', () => {
      wrapper.setState({
        widgetName: '',
        widgetUrl: '',
      });

      wrapper.instance().handleCreateWidget(event);

      expect(validateCheck).toHaveBeenCalledTimes(1);
      expect(validateCheck).toHaveBeenCalledWith('total');
    });

    window.ipcRenderer = mockIpcRenderer;
  });

  it('should change state when call handleWidgetNameChange', () => {
    const validateCheck = jest.spyOn(MakeWebWidget.prototype, 'validateCheck');
    validateCheck.mockClear();
    const wrapper = shallow(<MakeWebWidget />);

    wrapper.instance().handleWidgetNameChange({
      target: {
        value: 'mock-value',
      },
    });

    expect(wrapper.state().widgetName).toBe('mock-value');
    expect(validateCheck).toHaveBeenCalledTimes(1);
    expect(validateCheck).toHaveBeenCalledWith('name');
  });

  it('should change state when call handleWidgetNameChange', () => {
    const validateCheck = jest.spyOn(MakeWebWidget.prototype, 'validateCheck');
    validateCheck.mockClear();
    const wrapper = shallow(<MakeWebWidget />);

    wrapper.instance().handleWidgetUrlChange({
      target: {
        value: 'mock-value',
      },
    });

    expect(wrapper.state().widgetUrl).toBe('mock-value');
    expect(validateCheck).toHaveBeenCalledTimes(1);
    expect(validateCheck).toHaveBeenCalledWith('url');
  });
});
