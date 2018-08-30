import React from 'react';
import { shallow } from 'enzyme';

import OutsideClickHandler from '.';

describe('<OutsideClickHandler />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(
      <OutsideClickHandler>
        <div>
          mock
        </div>
      </OutsideClickHandler>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  describe('test handleOutSideClick', () => {
    const onOutSideClick = jest.fn();
    const wrapper = shallow(
      <OutsideClickHandler
        onOutSideClick={onOutSideClick}
      >
        <div>
          mock
        </div>
      </OutsideClickHandler>,
    );

    beforeEach(() => {
      onOutSideClick.mockClear();
    });

    it('when this.outsideRef.contains === true', () => {
      wrapper.instance().outsideRef = {
        contains: () => true,
      };

      wrapper.instance().handleOutSideClick({});

      expect(onOutSideClick).toHaveBeenCalledTimes(0);
    });

    it('when this.outsideRef.contains === false', () => {
      wrapper.instance().outsideRef = {
        contains: () => false,
      };

      wrapper.instance().handleOutSideClick({});

      expect(onOutSideClick).toHaveBeenCalledTimes(1);
      expect(onOutSideClick).toHaveBeenCalledWith();
    });
  });
});
