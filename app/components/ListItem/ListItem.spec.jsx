import React from 'react';
import { shallow } from 'enzyme';

import * as IPC from 'constants/ipc';
import ListItem from './';

describe('<ListItem />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<ListItem />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call correct when call handleSelectList', () => {
    const ipcRenderer = {
      send: () => {},
    };
    window.ipcRenderer = ipcRenderer;
    const send = jest.spyOn(window.ipcRenderer, 'send');
    const onSelectItem = jest.fn();
    const wrapper = shallow(
      <ListItem
        item={{
          id: 'mock-id',
        }}
        onSelectItem={onSelectItem}
      />,
    );

    wrapper.instance().handleSelectList();

    expect(onSelectItem).toHaveBeenCalledTimes(1);
    expect(onSelectItem).toHaveBeenCalledWith('mock-id');
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(
      IPC.WIDGET_SHOW_INACTIVE,
      'mock-id',
    );
  });

  it('should call correct when call handleWidgetOpen', () => {
    const ipcRenderer = {
      send: () => {
      },
    };
    window.ipcRenderer = ipcRenderer;
    const send = jest.spyOn(window.ipcRenderer, 'send');
    const wrapper = shallow(
      <ListItem
        item={{
          id: 'mock-id',
        }}
      />,
    );

    wrapper.instance().handleWidgetOpen();

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(
      IPC.WIDGET_OPEN,
      {
        id: 'mock-id',
        isActive: true,
      },
    );
  });
});
