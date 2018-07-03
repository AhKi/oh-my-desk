import React from 'react';
import { shallow } from 'enzyme';

import * as MODAL from 'constants/modal';
import WidgetList from '.';

describe('<WidgetList />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetList />);

    expect(wrapper).toMatchSnapshot();
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
    const wrapper = shallow(<WidgetList onSelectItem={onSelectItem} />);

    wrapper.instance().handleSelectItem('mock-id');

    expect(onSelectItem).toHaveBeenCalledTimes(1);
    expect(onSelectItem).toHaveBeenCalledWith('mock-id');
  });
});
