import React from 'react';
import { shallow } from 'enzyme';
import { remote } from 'electron';
import WidgetModeConfirm from '../Modal/WidgetModeConfirm';
import Setting from '.';

describe('<Setting />', () => {
  remote.getGlobal = jest.fn(() => () => JSON.stringify({ config: { language: 'English' } }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<Setting />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('test handleChangeLanguage', () => {
    const onSetLanguageEnglish = jest.fn();
    const onSetLanguageKorean = jest.fn();
    const wrapper = shallow(
      <Setting
        onSetLanguageEnglish={onSetLanguageEnglish}
        onSetLanguageKorean={onSetLanguageKorean}
      />,
    );

    it('when set English', () => {
      wrapper.instance().handleChangeLanguage({ target: { value: 'English' } });

      expect(onSetLanguageEnglish).toHaveBeenCalledTimes(1);
      expect(onSetLanguageEnglish).toHaveBeenCalledWith();
    });

    it('when set Korean', () => {
      wrapper.instance().handleChangeLanguage({ target: { value: 'Korean' } });

      expect(onSetLanguageKorean).toHaveBeenCalledTimes(1);
      expect(onSetLanguageKorean).toHaveBeenCalledWith();
    });
  });

  it('should call handleOpenWidgetModeModal', () => {
    const onModalOpen = jest.fn();
    const onToggleWidgetMode = jest.fn();
    const wrapper = shallow(
      <Setting
        onModalOpen={onModalOpen}
        onToggleWidgetMode={onToggleWidgetMode}
      />,
    );

    wrapper.instance().handleOpenWidgetModeModal();

    expect(onModalOpen).toHaveBeenCalledTimes(1);
    expect(onModalOpen).toHaveBeenCalledWith(
      WidgetModeConfirm,
      {
        onChangeMode: onToggleWidgetMode,
      },
    );
  });
});
