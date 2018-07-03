import React from 'react';
import { shallow } from 'enzyme';

import MakeWebWidget from './MakeWebWidget';

describe.skip('<MakeWebWidget />', () => {
  const ipcRenderer = {
    send: () => {},
  };
  window.ipcRenderer = ipcRenderer;

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

  describe('should test when call handleCreateWidget', () => {
    const event = {
      preventDefault() {},
    };
    const validateCheck = jest.spyOn(MakeWebWidget.prototype, 'validateCheck');
    const onModalClose = jest.fn();
    const onRegisterNew = jest.fn();
    const wrapper = shallow(
      <MakeWebWidget
        onRegisterNew={onRegisterNew}
        onModalClose={onModalClose}
      />,
    );

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('when widgetName or Url have error', () => {
      wrapper.setState({
        nameError: 'mock-name-error',
        urlError: 'mock-url-error',
      });

      wrapper.instance().handleCreateWidget(event);

      expect(validateCheck).toHaveBeenCalledTimes(1);
      expect(validateCheck).toHaveBeenCalledWith('total');
      expect(onRegisterNew).toHaveBeenCalledTimes(0);
      expect(onModalClose).toHaveBeenCalledTimes(0);
    });

    it('when widgetName or Url don\'t have error', () => {
      wrapper.setState({
        widgetName: 'mock-name',
        widgetUrl: 'mock-url',
        nameError: '',
        urlError: '',
      });

      wrapper.instance().handleCreateWidget(event);

      expect(validateCheck).toHaveBeenCalledTimes(0);
      expect(onRegisterNew).toHaveBeenCalledTimes(1);
      expect(onRegisterNew).toHaveBeenCalledWith(
        {
          name: 'mock-name',
          url: 'mock-url',
        },
      );
      expect(onModalClose).toHaveBeenCalledTimes(1);
      expect(onModalClose).toHaveBeenCalledWith();
    });
  });
});
