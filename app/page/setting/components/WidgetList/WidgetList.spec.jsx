import React from 'react';
import { shallow, mount } from 'enzyme';

import * as IPC from 'constants/ipc';
import * as MODAL from 'constants/modal';
import WidgetList from '.';

describe('<WidgetList />', () => {
  const ipcRenderer = {
    send: () => {},
    on: () => {},
  };
  window.ipcRenderer = ipcRenderer;

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetList />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call send and on action when componentDidMount', () => {
    const componentDidMount = jest.spyOn(WidgetList.prototype, 'componentDidMount');
    const send = jest.spyOn(ipcRenderer, 'send');
    const on = jest.spyOn(ipcRenderer, 'on');

    send.mockClear();
    on.mockClear();
    componentDidMount.mockClear();

    mount(<WidgetList />);

    expect(componentDidMount).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(IPC.WIDGET_INFO_REQUEST);
    expect(on).toHaveBeenCalledTimes(1);
  });

  it('should call onModalOpen when call handleOnModal', () => {
    const onModalOpen = jest.fn();
    const wrapper = shallow(<WidgetList onModalOpen={onModalOpen} />);

    wrapper.instance().handleOpenModal();

    expect(onModalOpen).toHaveBeenCalledTimes(1);
    expect(onModalOpen).toHaveBeenCalledWith(MODAL.MAKE_WEB_WIDGET);
  });

  it('should call onSelectFilter when call handleSelectFilter', () => {
    const onSelectFilter = jest.fn();
    const wrapper = shallow(<WidgetList onSelectFilter={onSelectFilter} />);

    wrapper.instance().handleSelectFilter({
      target: {
        value: 'mock-value',
      },
    });

    expect(onSelectFilter).toHaveBeenCalledTimes(1);
    expect(onSelectFilter).toHaveBeenCalledWith('mock-value');
  });

  it('should call correct when call handleSelectItem', () => {
    const onSelectItem = jest.fn();
    const send = jest.spyOn(ipcRenderer, 'send');
    send.mockClear();
    const wrapper = shallow(<WidgetList onSelectItem={onSelectItem} />);

    wrapper.instance().handleSelectItem('mock-id');

    expect(send).toHaveBeenCalledTimes(2);
    expect(send).toHaveBeenCalledWith(IPC.WIDGET_INFO_REQUEST);
    expect(onSelectItem).toHaveBeenCalledTimes(1);
    expect(onSelectItem).toHaveBeenCalledWith('mock-id');
  });
});
