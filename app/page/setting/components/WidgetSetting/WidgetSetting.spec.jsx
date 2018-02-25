import React from 'react';
import { shallow, mount } from 'enzyme';

import * as MODAL from 'constants/modal';
import WidgetSetting from './';

describe('<WidgetSetting />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetSetting />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('test componentWillMount', () => {
    const history = {
      goBack: () => {},
    };
    const goBack = jest.spyOn(history, 'goBack');

    it('when props.item === null', () => {
      mount(
        <WidgetSetting
          history={history}
          item={{
            size: {},
            isActive: false,
            isOnTop: false,
          }}
        />,
      );

      expect(goBack).toHaveBeenCalledTimes(0);
    });

    // Todo fix bug when item is null
  });

  describe('test componentWillUnmount', () => {
    let wrapper;
    const componentWillUnmount = jest.spyOn(WidgetSetting.prototype, 'componentWillUnmount');
    const onStoreWidgetInfo = jest.fn();
    beforeEach(() => {
      componentWillUnmount.mockClear();
      onStoreWidgetInfo.mockClear();
      wrapper = mount(
        <WidgetSetting
          item={{
            size: {},
            isActive: false,
            isOnTop: false,
          }}
          onStoreWidgetInfo={onStoreWidgetInfo}
        />,
      );
    });

    it('when info !== initialInfo', () => {
      wrapper.setState({
        info: {
          id: 'mock-id',
          size: {},
          isActive: false,
          isOnTop: false,
        },
        initialInfo: {
          id: 'mock-id',
          size: {},
          isActive: true,
          isOnTop: false,
        },
      });

      wrapper.unmount();

      expect(componentWillUnmount).toHaveBeenCalledTimes(1);
      expect(onStoreWidgetInfo).toHaveBeenCalledTimes(1);
      expect(onStoreWidgetInfo).toHaveBeenCalledWith(
        'mock-id',
        {
          id: 'mock-id',
          size: {},
          isActive: true,
          isOnTop: false,
        },
      );
    });

    it('when info === initialInfo', () => {
      wrapper.setState({
        info: {
          size: {},
          isActive: true,
          isOnTop: false,
        },
        initialInfo: {
          size: {},
          isActive: true,
          isOnTop: false,
        },
      });

      wrapper.unmount();

      expect(componentWillUnmount).toHaveBeenCalledTimes(1);
      expect(onStoreWidgetInfo).toHaveBeenCalledTimes(0);
    });
  });

  it('should change state when call componentWillReceiveProps', () => {
    const componentWillReceiveProps = jest.spyOn(WidgetSetting.prototype, 'componentWillReceiveProps');
    const wrapper = mount(
      <WidgetSetting
        item={{
          size: {},
          isActive: false,
          isOnTop: false,
        }}
      />,
    );

    wrapper.setProps({
      info: {
        size: {
          width: 100,
          height: 100,
        },
        isActive: false,
        isOnTop: false,
      },
    });

    expect(componentWillReceiveProps).toHaveBeenCalledTimes(1);
    expect(wrapper.state().info).toEqual(
      {
        size: {},
        isActive: false,
        isOnTop: false,
      },
    );
  });

  it('should call onModalOpen when call handleCancelEdit', () => {
    const onModalOpen = jest.fn();
    const wrapper = shallow(
      <WidgetSetting
        onModalOpen={onModalOpen}
      />,
    );

    wrapper.instance().handleCancelEdit();

    expect(onModalOpen).toHaveBeenCalledTimes(1);
    // TODO match test expect().toHaveBeenCalledWith difficult to test anonymous function
  });

  it('should change state when call setStateInfo', () => {
    const wrapper = shallow(<WidgetSetting />);
    wrapper.setState({
      info: {
        isOnTop: false,
        isActive: false,
      },
    });

    wrapper.instance().setStateInfo('id', 'mock-id');

    expect(wrapper.state().info).toEqual(
      {
        isOnTop: false,
        isActive: false,
        id: 'mock-id',
      },
    );
  });

  it('should change state.info.size when call handleChangeSizeWidth', () => {
    const wrapper = shallow(<WidgetSetting />);

    wrapper.setState({
      info: {
        size: {
          width: 100,
          height: 100,
        },
      },
    });

    wrapper.instance().handleChangeSizeWidth({
      target: {
        value: 250,
      },
    });

    expect(wrapper.state().info.size).toEqual({
      width: 250,
      height: 100,
    });
  });

  it('should change state.info.size when call handleChangeSizeHeight', () => {
    const wrapper = shallow(<WidgetSetting />);

    wrapper.setState({
      info: {
        size: {
          width: 100,
          height: 100,
        },
      },
    });

    wrapper.instance().handleChangeSizeHeight({
      target: {
        value: 250,
      },
    });

    expect(wrapper.state().info.size).toEqual({
      width: 100,
      height: 250,
    });
  });

  it('should call history.push when call handleMoveWidgetList', () => {
    const history = {
      push: () => {},
    };
    const push = jest.spyOn(history, 'push');
    const wrapper = shallow(<WidgetSetting history={history} />);

    wrapper.instance().handleMoveWidgetList();

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/widget-list');
  });

  it('should call correct when call handleSubmit', () => {
    const event = { preventDefault: () => {} };
    const onStoreWidgetInfo = jest.fn();
    const onModalOpen = jest.fn();
    const hideInput = {
      focus: () => {},
    };
    const focus = jest.spyOn(hideInput, 'focus');

    const wrapper = shallow(
      <WidgetSetting
        onStoreWidgetInfo={onStoreWidgetInfo}
        onModalOpen={onModalOpen}
      />,
    );
    wrapper.setState({
      info: {
        id: 'mock-id',
        size: {},
        isActive: false,
        isOnTop: false,
      },
      initialInfo: {
        id: 'mock-id',
        size: {},
        isActive: true,
        isOnTop: false,
      },
    });
    wrapper.instance().hideInput = hideInput;

    wrapper.instance().handleSubmit(event);

    expect(wrapper.state().initialInfo).toEqual(
      {
        id: 'mock-id',
        size: {},
        isActive: false,
        isOnTop: false,
      },
    );
    expect(onStoreWidgetInfo).toHaveBeenCalledTimes(1);
    expect(onStoreWidgetInfo).toHaveBeenCalledWith(
      'mock-id',
      {
        id: 'mock-id',
        size: {},
        isActive: false,
        isOnTop: false,
      },
    );
    expect(onModalOpen).toHaveBeenCalledTimes(1);
    expect(onModalOpen).toHaveBeenCalledWith(
      MODAL.CONFIRM,
      {
        title: 'Save complete',
        content: 'Widget Setting is Changed',
      },
    );
    expect(focus).toHaveBeenCalledTimes(1);
  });
});
