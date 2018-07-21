import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import i18n from 'constants/i18n';
import SettingContainer from 'page/preference/containers/SettingContainer';
import HotKey from '../HotKey';
import PreferenceHeader from '../PreferenceHeader';
import Update from '../Update';
import Widget from '../Widget';
import './Preference.scss';

const propTypes = {
  lang: PropTypes.string,
  onSetLanguageEnglish: PropTypes.func,
  onSetLanguageKorean: PropTypes.func,
};
const defaultProps = {
  lang: 'English',
  onSetLanguageEnglish() {},
  onSetLanguageKorean() {},
};

class Preference extends React.Component {
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
    const { lang } = this.props;

    return (
      <div className="Preference">
        <PreferenceHeader />
        <div className="Preference__Content">
          <Switch>
            <Route exact path="/" component={SettingContainer} />
            <Route path="/hot-key" component={HotKey} />
            <Route path="/update" component={Update} />
            <Route path="/widget" component={Widget} />
          </Switch>
          <select value={lang} onChange={this.handleChangeLanguage}>
            <option value="English">English</option>
            <option value="Korean">Korean</option>
          </select>
          <p>{text.temp}</p>
        </div>
      </div>
    );
  }
}

Preference.propTypes = propTypes;
Preference.defaultProps = defaultProps;

export default Preference;
