import React from 'react';
import { remote, shell } from 'electron';
import PropTypes from 'prop-types';
import i18n from 'constants/i18n';
import './Update.scss';

const propTypes = {
  isUpdateCheckFetch: PropTypes.bool,
  onUpdateCheckOnManual: PropTypes.func,
};
const defaultProps = {
  isUpdateCheckFetch: false,
  onUpdateCheckOnManual() {},
};

class Update extends React.Component {
  static handleOpenLink() {
    shell.openExternal('https://github.com/AhKi/oh-my-desk');
  }

  constructor(props) {
    super(props);
    this.handleUpdateCheck = this.handleUpdateCheck.bind(this);
  }

  handleUpdateCheck() {
    const { isUpdateCheckFetch, onUpdateCheckOnManual } = this.props;

    if (!isUpdateCheckFetch) {
      onUpdateCheckOnManual();
    }
  }


  render() {
    const text = i18n().preference;
    const appName = remote.app.getName();
    const appVersion = remote.app.getVersion();
    const { isUpdateCheckFetch } = this.props;

    return (
      <div className="Update">
        <p className="Update__title">{text.appVersion}</p>
        <button
          className="Update__app-name"
          type="button"
          onClick={Update.handleOpenLink}
        >
          {appName} {appVersion}
        </button>
        <button
          className="Btn--gray"
          disabled={isUpdateCheckFetch}
          type="button"
          onClick={this.handleUpdateCheck}
        >
          {isUpdateCheckFetch ? text.checkingUpdate : text.checkUpdate}
        </button>
      </div>
    );
  }
}

Update.propTypes = propTypes;
Update.defaultProps = defaultProps;

export default Update;
