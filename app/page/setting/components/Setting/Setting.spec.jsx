import React from 'react';
import { shallow } from 'enzyme';

import Setting from './';

describe('<Setting />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<Setting />);

    expect(wrapper).toMatchSnapshot();
  });
});
