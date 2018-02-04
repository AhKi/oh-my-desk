import React from 'react';
import { shallow } from 'enzyme';

import Confirm from './Confirm';

describe('<Confirm />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<Confirm />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('test handleEnterEvent', () => {
    const onModalClose = jest.fn();
    const wrapper = shallow(<Confirm onModalClose={onModalClose} />);

    afterEach(() => {
      onModalClose.mockClear();
    });

    it('when e.keyCode === 13', () => {
      wrapper.instance().handleEnterEvent({
        keyCode: 13,
      });

      expect(onModalClose).toHaveBeenCalledTimes(1);
      expect(onModalClose).toHaveBeenCalledWith();
    });

    it('when e.keyCode !== 13', () => {
      wrapper.instance().handleEnterEvent({
        keyCode: 14,
      });

      expect(onModalClose).toHaveBeenCalledTimes(0);
    });
  });
});
