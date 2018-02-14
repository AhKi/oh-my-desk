import React from 'react';
import { shallow } from 'enzyme';

import EditSetting from './';

describe('<EditSetting />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(
      <EditSetting
        item={{
          isActive: false,
          isOnTop: false,
        }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChangeInput when call handleChangeName', () => {
    const onChangeInput = jest.fn();
    const wrapper = shallow(
      <EditSetting
        item={{
          isActive: false,
          isOnTop: false,
        }}
        onChangeInput={onChangeInput}
      />,
    );

    wrapper.instance().handleChangeName({
      target: {
        value: 'mock-value',
      },
    });

    expect(onChangeInput).toHaveBeenCalledTimes(1);
    expect(onChangeInput).toHaveBeenCalledWith('name', 'mock-value');
  });

  it('should call onChangeInput when call handleChangeUrl', () => {
    const onChangeInput = jest.fn();
    const wrapper = shallow(
      <EditSetting
        item={{
          isActive: false,
          isOnTop: false,
        }}
        onChangeInput={onChangeInput}
      />,
    );

    wrapper.instance().handleChangeUrl({
      target: {
        value: 'mock-value',
      },
    });

    expect(onChangeInput).toHaveBeenCalledTimes(1);
    expect(onChangeInput).toHaveBeenCalledWith('url', 'mock-value');
  });

  it('should call onStoreWidgetInfo when call handleToggleIsActive', () => {
    const onStoreWidgetInfo = jest.fn();
    const wrapper = shallow(
      <EditSetting
        item={{
          id: 'mock-id',
          isActive: false,
          isOnTop: false,
        }}
        onStoreWidgetInfo={onStoreWidgetInfo}
      />,
    );

    wrapper.instance().handleToggleIsActive();

    expect(onStoreWidgetInfo).toHaveBeenCalledTimes(1);
    expect(onStoreWidgetInfo).toHaveBeenCalledWith(
      'mock-id',
      {
        id: 'mock-id',
        isActive: true,
        isOnTop: false,
      },
    );
  });

  it('should call onStoreWidgetInfo when call handleToggleIsOnTop', () => {
    const onStoreWidgetInfo = jest.fn();
    const wrapper = shallow(
      <EditSetting
        item={{
          id: 'mock-id',
          isActive: false,
          isOnTop: false,
        }}
        onStoreWidgetInfo={onStoreWidgetInfo}
      />,
    );

    wrapper.instance().handleToggleIsOnTop();

    expect(onStoreWidgetInfo).toHaveBeenCalledTimes(1);
    expect(onStoreWidgetInfo).toHaveBeenCalledWith(
      'mock-id',
      {
        id: 'mock-id',
        isActive: false,
        isOnTop: true,
      },
    );
  });
});
