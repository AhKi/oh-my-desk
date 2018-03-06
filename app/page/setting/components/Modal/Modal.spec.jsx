import React from 'react';
import { shallow } from 'enzyme';

import Modal from './';

describe('<Modal />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<Modal />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when props.isOpen === false', () => {
    const wrapper = shallow(
      <Modal
        modalType="CONFIRM"
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
