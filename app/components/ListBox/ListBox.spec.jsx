import React from 'react';
import { shallow } from 'enzyme';

import ListBox from './';

describe('<ListBox />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<ListBox list={[{ id: 1 }]} />);

    expect(wrapper).toMatchSnapshot();
  });
});
