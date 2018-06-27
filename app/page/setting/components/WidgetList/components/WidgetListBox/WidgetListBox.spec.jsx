import React from 'react';
import { shallow } from 'enzyme';

import WidgetListBox from '.';

describe('<WidgetListBox />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetListBox list={[{ id: 1 }]} />);

    expect(wrapper).toMatchSnapshot();
  });
});
