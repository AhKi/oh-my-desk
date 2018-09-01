import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'constants/i18n';
import ToggleButton from 'renderer/components/ToggleButton';
import WidgetModeConfirm from '../Modal/WidgetModeConfirm';
import './Setting.scss';

const propTypes = {
  defaultUserAgent: PropTypes.string,
  language: PropTypes.string,
  isOpenWidgetWhenStart: PropTypes.bool,
  isLaunchAppWhenLogin: PropTypes.bool,
  onModalOpen: PropTypes.func,
  onSetLanguageEnglish: PropTypes.func,
  onSetLanguageKorean: PropTypes.func,
  onToggleAutoActiveWidget: PropTypes.func,
  onToggleAutoLaunch: PropTypes.func,
  onToggleWidgetMode: PropTypes.func,
};

const defaultProps = {
  defaultUserAgent: 'DESKTOP',
  language: 'English',
  isOpenWidgetWhenStart: true,
  isLaunchAppWhenLogin: true,
  onModalOpen() {},
  onSetLanguageEnglish() {},
  onSetLanguageKorean() {},
  onToggleAutoActiveWidget() {},
  onToggleAutoLaunch() {},
  onToggleWidgetMode() {},
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
    const { onModalOpen, onToggleWidgetMode } = this.props;

    onModalOpen(WidgetModeConfirm, {
      onChangeMode: onToggleWidgetMode,
    });
  }

  render() {
    const text = i18n().preference;
    const {
      defaultUserAgent,
      language,
      isOpenWidgetWhenStart,
      isLaunchAppWhenLogin,
      onToggleAutoActiveWidget,
      onToggleAutoLaunch,
    } = this.props;

    return (
      <div className="Setting">
        <p className="Setting__title">{text.user}</p>
        <ul className="Setting__list-set">
          <li className="Setting__list">
            {text.autoStart}
            <ToggleButton
              isCheck={isLaunchAppWhenLogin}
              onToggle={onToggleAutoLaunch}
            />
          </li>
          <li className="Setting__list">
            {text.autoWidgetActive}
            <ToggleButton
              isCheck={isOpenWidgetWhenStart}
              onToggle={onToggleAutoActiveWidget}
            />
          </li>
          <li className="Setting__list">
            {text.language}
            <select value={language} onChange={this.handleChangeLanguage}>
              <option value="English">English</option>
              <option value="Korean">한국어</option>
            </select>
          </li>
        </ul>
        <p className="Setting__title">{text.shape}</p>
        <ul className="Setting__list-set">
          <li className="Setting__list">
            {text.defaultWidgetMode}
            <select value={defaultUserAgent} onChange={this.handleOpenWidgetModeModal}>
              <option value="DESKTOP">{text.desktopMode}</option>
              <option value="MOBILE">{text.mobileMode}</option>
            </select>
          </li>
          <li className="Setting__list">
            {text.themeColor}
            <select>
              <option value="English">{text.colorSpaceGray}</option>
            </select>
          </li>
        </ul>
      </div>
    );
  }
}

Setting.propTypes = propTypes;
Setting.defaultProps = defaultProps;

export default Setting;
