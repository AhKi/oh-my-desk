import React from 'react';
import { shallow } from 'enzyme';
import DeleteWidgetConfirm from '.';

describe('<DeleteWidgetConfirm />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<DeleteWidgetConfirm />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleDelete', () => {
    const onDelete = jest.fn();
    const onModalClose = jest.fn();
    const wrapper = shallow(
      <DeleteWidgetConfirm
        id="mock-id"
        onDelete={onDelete}
        onModalClose={onModalClose}
      />,
    );

    wrapper.instance().handleDelete();

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith('mock-id');
    expect(onModalClose).toHaveBeenCalledTimes(1);
    expect(onModalClose).toHaveBeenCalledWith();
  });
});
