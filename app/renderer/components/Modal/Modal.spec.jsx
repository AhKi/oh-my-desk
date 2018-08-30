import React from 'react';
import { shallow } from 'enzyme';
import Modal from '.';

describe('<Modal />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<Modal Component={null} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when props.Component exist', () => {
    const wrapper = shallow(<Modal Component={() => <div />} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when activeOutsideClose === true', () => {
    const wrapper = shallow(
      <Modal
        Component={() => <div />}
        modalProps={{ activeOutsideClose: true }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
