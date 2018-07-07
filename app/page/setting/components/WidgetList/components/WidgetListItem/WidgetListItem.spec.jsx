/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';

import * as MODAL from 'constants/modal';
import OutsideClickHandler from 'components/OutsideClickHandler';
import WidgetListItem from '.';

describe.skip('<WidgetListItem />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(
      <WidgetListItem
        item={{
          isOpen: true,
        }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when props.isActiveMore === true', () => {
    const wrapper = shallow(
      <WidgetListItem
        item={{
          isOnTop: true,
          isOpen: true,
        }}
      />,
    );
    wrapper.setState({ isOpen: true });

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
      <WidgetListItem
        item={{
          id: 'mock-id',
          isOpen: true,
        }}
        onSelectItem={onSelectItem}
      />,
    );

    wrapper.instance().handleSelectItem();

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
      <WidgetListItem
        item={{
          id: 'mock-id',
          isOpen: true,
        }}
      />,
    );

    wrapper.instance().handleWidgetOpen();

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(
      IPC.WIDGET_OPEN,
      {
        id: 'mock-id',
        isOpen: true,
      },
    );
  });

  describe('should call onUpdateInfoWithIPC when call handleToggleIsActive', () => {
    const onUpdateInfoWithIPC = jest.fn();
    const wrapper = shallow(
      <WidgetListItem
        item={{
          isOpen: true,
          id: 'mock-id',
        }}
        onUpdateInfoWithIPC={onUpdateInfoWithIPC}
      />,
    );

    beforeEach(() => {
      onUpdateInfoWithIPC.mockClear();
    });

    it('when item.isActive === true', () => {
      const { item } = wrapper.instance().props;
      wrapper.setProps({ item: { ...item, isOpen: true } });
      wrapper.instance().handleToggleIsActive();

      expect(onUpdateInfoWithIPC).toHaveBeenCalledTimes(1);
      expect(onUpdateInfoWithIPC).toHaveBeenCalledWith(
        'mock-id',
        {
          id: 'mock-id',
          isOpen: false,
        },
      );
    });

    it('when item.isActive === false', () => {
      const { item } = wrapper.instance().props;
      wrapper.setProps({ item: { ...item, isOpen: false } });
      wrapper.instance().handleToggleIsActive();

      expect(onUpdateInfoWithIPC).toHaveBeenCalledTimes(1);
      expect(onUpdateInfoWithIPC).toHaveBeenCalledWith(
        'mock-id',
        {
          id: 'mock-id',
          isOpen: true,
        },
      );
    });
  });

  describe('should call onUpdateInfoWithIPC when call handleToggleAlwaysTop', () => {
    const onUpdateInfoWithIPC = jest.fn();
    const wrapper = shallow(
      <WidgetListItem
        item={{
          isOpen: true,
          id: 'mock-id',
        }}
        onUpdateInfoWithIPC={onUpdateInfoWithIPC}
      />,
    );

    beforeEach(() => {
      onUpdateInfoWithIPC.mockClear();
    });

    it('when item.isOnTop === true', () => {
      const { item } = wrapper.instance().props;
      wrapper.setProps({ item: { ...item, isOnTop: true } });
      wrapper.instance().handleToggleAlwaysTop();

      expect(onUpdateInfoWithIPC).toHaveBeenCalledTimes(1);
      expect(onUpdateInfoWithIPC).toHaveBeenCalledWith(
        'mock-id',
        {
          id: 'mock-id',
          isOnTop: false,
          isOpen: true,
        },
      );
    });

    it('when item.isOnTop === false', () => {
      const { item } = wrapper.instance().props;
      wrapper.setProps({ item: { ...item, isOnTop: false } });
      wrapper.instance().handleToggleAlwaysTop();

      expect(onUpdateInfoWithIPC).toHaveBeenCalledTimes(1);
      expect(onUpdateInfoWithIPC).toHaveBeenCalledWith(
        'mock-id',
        {
          id: 'mock-id',
          isOnTop: true,
          isOpen: true,
        },
      );
    });
  });

  describe('test handleToggleMore', () => {
    const wrapper = shallow(
      <WidgetListItem
        item={{
          isOpen: true,
          id: 'mock-id',
        }}
      />,
    );

    describe('handleToggleMore argument is undefined', () => {
      it('when state.isActiveMore === true', () => {
        wrapper.setState({ isActiveMore: true });
        wrapper.instance().handleToggleMore();

        expect(wrapper.state().isActiveMore).toBe(false);

        wrapper.instance().handleToggleMore();

        expect(wrapper.state().isActiveMore).toBe(true);
      });

      it('when state.isActiveMore === false', () => {
        wrapper.setState({ isActiveMore: false });
        wrapper.instance().handleToggleMore();

        expect(wrapper.state().isActiveMore).toBe(true);

        wrapper.instance().handleToggleMore();

        expect(wrapper.state().isActiveMore).toBe(false);
      });
    });

    describe('handleToggleMore argument is boolean', () => {
      it('when argument === true', () => {
        wrapper.setState({ isActiveMore: false });
        wrapper.instance().handleToggleMore(true);

        expect(wrapper.state().isActiveMore).toBe(true);

        wrapper.instance().handleToggleMore(true);

        expect(wrapper.state().isActiveMore).toBe(true);
      });

      it('when argument === false', () => {
        wrapper.setState({ isActiveMore: true });
        wrapper.instance().handleToggleMore(false);

        expect(wrapper.state().isActiveMore).toBe(false);

        wrapper.instance().handleToggleMore(false);

        expect(wrapper.state().isActiveMore).toBe(false);
      });
    });
  });

  it('should call onModalOpen when call handleOpenDeleteModal', () => {
    const onModalOpen = jest.fn();
    const wrapper = shallow(
      <WidgetListItem
        item={{
          isOpen: true,
          id: 'mock-id',
          name: 'mock-name',
        }}
        onModalOpen={onModalOpen}
      />,
    );

    wrapper.instance().handleOpenDeleteModal();

    expect(onModalOpen).toHaveBeenCalledTimes(1);
    expect(onModalOpen).toHaveBeenCalledWith(
      MODAL.DELETE_CONFIRM_WIDGET,
      {
        id: 'mock-id',
        name: 'mock-name',
      },
    );
  });

  it('should call handleToggleMore when call OutsideClickHandler.onOutSideClick', () => {
    const handleToggleMore = jest.spyOn(WidgetListItem.prototype, 'handleToggleMore');
    handleToggleMore.mockClear();
    const wrapper = shallow(
      <WidgetListItem
        item={{
          isOpen: true,
          id: 'mock-id',
        }}
      />,
    );
    wrapper.setState({ isActiveMore: true });

    const outsideHandler = wrapper.find(OutsideClickHandler);

    outsideHandler.props().onOutSideClick();

    expect(handleToggleMore).toHaveBeenCalledTimes(1);
    expect(handleToggleMore).toHaveBeenCalledWith(false);
  });

  it('should call handleToggleMore when click [data-name="outside-inner-more-btn"]', () => {
    const handleToggleMore = jest.spyOn(WidgetListItem.prototype, 'handleToggleMore');
    handleToggleMore.mockClear();
    const wrapper = shallow(
      <WidgetListItem
        item={{
          isOpen: true,
          id: 'mock-id',
        }}
      />,
    );
    wrapper.setState({ isActiveMore: true });

    const btn = wrapper.find('[data-name="outside-inner-more-btn"]');

    btn.simulate('click');

    expect(handleToggleMore).toHaveBeenCalledTimes(1);
    expect(handleToggleMore).toHaveBeenCalledWith();
  });

  it('should call handleToggleMore when click [data-name="more-btn"]', () => {
    const handleToggleMore = jest.spyOn(WidgetListItem.prototype, 'handleToggleMore');
    handleToggleMore.mockClear();
    const wrapper = shallow(
      <WidgetListItem
        item={{
          isOpen: true,
          id: 'mock-id',
        }}
      />,
    );
    const btn = wrapper.find('[data-name="more-btn"]');

    btn.simulate('click');

    expect(handleToggleMore).toHaveBeenCalledTimes(1);
    expect(handleToggleMore).toHaveBeenCalledWith();
  });
});
