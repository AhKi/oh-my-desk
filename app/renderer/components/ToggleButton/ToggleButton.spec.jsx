import React from 'react';
import { shallow } from 'enzyme';

import ToggleButton from '.';

describe('<ToggleButton />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<ToggleButton isCheck />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when isCheck === false', () => {
    const wrapper = shallow(<ToggleButton isCheck={false} />);

    expect(wrapper).toMatchSnapshot();
  });
});
