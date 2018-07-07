/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';

import DeleteConfirmWidget from './DeleteConfirmWidget';

describe.skip('<DeleteConfirmWidget />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<DeleteConfirmWidget />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleDeletWidget', () => {
    const deleteWidget = jest.spyOn(utils, 'default');
    const onClose = jest.fn();
    const wrapper = shallow(
      <DeleteConfirmWidget
        id="mock-id"
        onClose={onClose}
      />,
    );

    wrapper.instance().handleDeleteWidget();

    expect(deleteWidget).toHaveBeenCalledTimes(1);
    expect(deleteWidget).toHaveBeenCalledWith('mock-id');
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith();
  });
});
