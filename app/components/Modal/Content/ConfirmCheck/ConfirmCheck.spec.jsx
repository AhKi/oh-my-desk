import React from 'react';
import { shallow } from 'enzyme';

import ConfirmCheck from './ConfirmCheck';

describe('<ConfirmCheck />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<ConfirmCheck />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call onConfirm when call handleConfirm', () => {
    const onConfirm = jest.fn();
    const onModalClose = jest.fn();
    const wrapper = shallow(
      <ConfirmCheck
        onConfirm={onConfirm}
        onModalClose={onModalClose}
      />,
    );

    wrapper.instance().handleConfirm('mock-arg');

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith('mock-arg');
    expect(onModalClose).toHaveBeenCalledWith();
  });
});
