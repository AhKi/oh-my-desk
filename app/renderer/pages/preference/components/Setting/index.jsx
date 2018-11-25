import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'constants/i18n';
import ToggleButton from 'renderer/components/ToggleButton';
import WidgetModeConfirm from '../Modal/WidgetModeConfirm';
import ConfigureHotKeyContainer from '../../containers/ConfigureHotKeyContainer';
import './Setting.scss';

const propTypes = {
  defaultUserAgent: PropTypes.string,
  language: PropTypes.string,
  isOpenWidgetWhenStart: PropTypes.bool,
  isLaunchAppWhenLogin: PropTypes.bool,
  onModalOpen: PropTypes.func,
  onSetLanguageEnglish: PropTypes.func,
  onSetLanguageKorean: PropTypes.func,
  onToggleOpenWidgetWhenStart: PropTypes.func,
  onToggleOpenAppWhenLogin: PropTypes.func,
  onToggleWidgetDefaultUserAgent: PropTypes.func,
};

const defaultProps = {
  defaultUserAgent: 'DESKTOP',
  language: 'English',
  isOpenWidgetWhenStart: true,
  isLaunchAppWhenLogin: true,
  onModalOpen() {},
  onSetLanguageEnglish() {},
  onSetLanguageKorean() {},
  onToggleOpenWidgetWhenStart() {},
  onToggleOpenAppWhenLogin() {},
  onToggleWidgetDefaultUserAgent() {},
};

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.handleOpenWidgetModeModal = this.handleOpenWidgetModeModal.bind(this);
  }

  handleChangeLanguage(e) {
    const language = e.target.value;
    const { onSetLanguageEnglish, onSetLanguageKorean } = this.props;

    if (language === 'English') {
      onSetLanguageEnglish();
    } else {
      onSetLanguageKorean();
    }
  }

  handleOpenWidgetModeModal() {
    const { onModalOpen, onToggleWidgetDefaultUserAgent } = this.props;

    onModalOpen(WidgetModeConfirm, {
      onChangeMode: onToggleWidgetDefaultUserAgent,
    });
  }

  render() {
    const text = i18n().preference;
    const {
      defaultUserAgent,
      language,
      isOpenWidgetWhenStart,
      isLaunchAppWhenLogin,
      onToggleOpenWidgetWhenStart,
      onToggleOpenAppWhenLogin,
    } = this.props;

    return (
      <div className="Setting">
        <div>
          <p className="Setting__title">{text.user}</p>
          <ul className="Setting__list-set">
            <li className="Setting__list">
              {text.autoStart}
              <ToggleButton
                isCheck={isLaunchAppWhenLogin}
                onToggle={onToggleOpenAppWhenLogin}
              />
            </li>
            <li className="Setting__list">
              {text.autoWidgetActive}
              <ToggleButton
                isCheck={isOpenWidgetWhenStart}
                onToggle={onToggleOpenWidgetWhenStart}
              />
            </li>
            <li className="Setting__list">
              {text.language}
              <select
                className="InputSet__select"
                value={language}
                onChange={this.handleChangeLanguage}
              >
                <option value="English">English</option>
                <option value="Korean">한국어</option>
              </select>
            </li>
          </ul>
        </div>
        <div>
          <p className="Setting__title">{text.shape}</p>
          <ul className="Setting__list-set">
            <li className="Setting__list">
              {text.defaultWidgetMode}
              <select
                className="InputSet__select"
                value={defaultUserAgent}
                onChange={this.handleOpenWidgetModeModal}
              >
                <option value="DESKTOP">{text.desktopMode}</option>
                <option value="MOBILE">{text.mobileMode}</option>
              </select>
            </li>
            <li className="Setting__list">
              {text.hotKeySearch}
              <ConfigureHotKeyContainer />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Setting.propTypes = propTypes;
Setting.defaultProps = defaultProps;

export default Setting;
