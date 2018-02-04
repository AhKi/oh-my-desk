import React from 'react';
import { shallow } from 'enzyme';

import GlobalNavigationBar from './';

describe('<GlobalNavigationBar />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<GlobalNavigationBar />);

    expect(wrapper).toMatchSnapshot();
  });
});
