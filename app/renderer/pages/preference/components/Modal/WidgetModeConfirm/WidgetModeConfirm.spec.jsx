import React from 'react';
import { shallow } from 'enzyme';

import WidgetModeConfirm from '.';

describe('<WidgetModeConfirm />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetModeConfirm />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleChange', () => {
    const onChangeMode = jest.fn();
    const onModalClose = jest.fn();
    const wrapper = shallow(
      <WidgetModeConfirm
        onChangeMode={onChangeMode}
        onModalClose={onModalClose}
      />,
    );

    wrapper.instance().handleChange();

    expect(onChangeMode).toHaveBeenCalledTimes(1);
    expect(onChangeMode).toHaveBeenCalledWith();
    expect(onModalClose).toHaveBeenCalledTimes(1);
    expect(onModalClose).toHaveBeenCalledWith();
  });
});
