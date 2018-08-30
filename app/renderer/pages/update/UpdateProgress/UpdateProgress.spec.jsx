import React from 'react';
import { shallow } from 'enzyme';
import { remote } from 'electron';
import UpdateProgress from './UpdateProgress';

describe('<UpdateProgress />', () => {
  remote.getGlobal = jest.fn(() => () => JSON.stringify({ status: { lang: 'English' } }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<UpdateProgress />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when props.isDownload === true', () => {
    const wrapper = shallow(<UpdateProgress isDownload />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('should test handleClickButton', () => {
    // const handleClickButton = jest.spyOn(UpdateProgress.prototype, 'handleClickButton');
    const relaunch = jest.fn();
    const quit = jest.fn();
    const close = jest.fn();

    remote.app = {
      relaunch,
      quit,
    };
    remote.getCurrentWindow = () => ({
      close,
    });

    const onCancelDownload = jest.fn();
    const wrapper = shallow(<UpdateProgress onCancelDownload={onCancelDownload} />);

    it('when isDownload === true', () => {
      wrapper.setProps({ isDownload: true });
      wrapper.instance().handleClickButton();

      expect(onCancelDownload).toHaveBeenCalledTimes(1);
      expect(close).toHaveBeenCalledTimes(1);
      expect(relaunch).toHaveBeenCalledTimes(0);
      expect(quit).toHaveBeenCalledTimes(0);
    });

    it('when isDownload === false', () => {
      wrapper.setProps({ isDownload: false });
      wrapper.instance().handleClickButton();

      expect(onCancelDownload).toHaveBeenCalledTimes(0);
      expect(close).toHaveBeenCalledTimes(1);
      expect(relaunch).toHaveBeenCalledTimes(1);
      expect(quit).toHaveBeenCalledTimes(1);
    });
  });
});
