import React from 'react';
import { shallow, mount } from 'enzyme';

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

  it('test componentDidMount and componentWillUnmount react lifecycle hook', () => {
    const componentDidMount = jest.spyOn(Confirm.prototype, 'componentDidMount');
    const componentWillUnmount = jest.spyOn(Confirm.prototype, 'componentWillUnmount');
    const addEventListener = jest.spyOn(document, 'addEventListener');
    const removeEventListener = jest.spyOn(document, 'addEventListener');
    const wrapper = mount(<Confirm />);

    expect(componentDidMount).toHaveBeenCalledTimes(1);
    expect(addEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );

    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
    expect(removeEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );
  });
});
