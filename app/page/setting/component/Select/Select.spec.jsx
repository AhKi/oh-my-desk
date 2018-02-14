import React from 'react';
import { shallow } from 'enzyme';

import Select from './';

describe('<Select />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<Select />);

    expect(wrapper).toMatchSnapshot();
  });
});
