import React from 'react';
import { shallow } from 'enzyme';

import EditSize from '.';

describe('<EditSize />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(
      <EditSize
        item={{
          size: {
            height: 100,
            width: 100,
          },
        }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when size is zero', () => {
    const wrapper = shallow(
      <EditSize
        item={{
          size: {
            height: 0,
            width: 0,
          },
        }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
