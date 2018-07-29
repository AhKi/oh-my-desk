import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'constants/i18n';
import ToggleButton from 'page/Components/ToggleButton';
import './Setting.scss';

const propTypes = {
  lang: PropTypes.string,
  isAutoLaunch: PropTypes.bool,
  widgetMode: PropTypes.string,
  onSetLanguageEnglish: PropTypes.func,
  onSetLanguageKorean: PropTypes.func,
  onToggleAutoLaunch: PropTypes.func,
  onToggleWidgetMode: PropTypes.func,
};

const defaultProps = {
  lang: 'English',
  isAutoLaunch: true,
  widgetMode: 'DESKTOP',
  onSetLanguageEnglish() {},
  onSetLanguageKorean() {},
  onToggleAutoLaunch() {},
  onToggleWidgetMode() {},
};

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
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

  render() {
    const text = i18n().preference;
    const {
      lang,
      isAutoLaunch,
      widgetMode,
      onToggleAutoLaunch,
      onToggleWidgetMode,
    } = this.props;

    return (
      <div className="Setting">
        <p className="Setting__title">{text.user}</p>
        <ul className="Setting__list-set">
          <li className="Setting__list">
            {text.autoStart}
            <ToggleButton
              isCheck={isAutoLaunch}
              onToggle={onToggleAutoLaunch}
            />
          </li>
          <li className="Setting__list">
            {text.autoWidgetActive}
            <ToggleButton
              isCheck={isAutoLaunch}
              onToggle={onToggleAutoLaunch}
            />
          </li>
          <li className="Setting__list">
            {text.language}
            <select value={lang} onChange={this.handleChangeLanguage}>
              <option value="English">English</option>
              <option value="Korean">한국어</option>
            </select>
          </li>
        </ul>
        <p className="Setting__title">{text.shape}</p>
        <ul className="Setting__list-set">
          <li className="Setting__list">
            {text.defaultWidgetMode}
            <select value={widgetMode} onChange={onToggleWidgetMode}>
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
