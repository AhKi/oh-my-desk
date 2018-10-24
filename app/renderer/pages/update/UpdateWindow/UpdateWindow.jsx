import React from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import i18n from 'constants/i18n';
import logo from 'assets/oh-my-desk-icon.png';
import './UpdateWindow.scss';

const propTypes = {
  isDownloadUpdateWhenStart: PropTypes.bool,
  isDownloadFetch: PropTypes.bool,
  newVersion: PropTypes.string,
  releaseNotes: PropTypes.string,
  onSetAutoUpdate: PropTypes.func,
  onSkipThisVersion: PropTypes.func,
  onInstallRequest: PropTypes.func,
};

const defaultProps = {
  isDownloadUpdateWhenStart: false,
  isDownloadFetch: false,
  newVersion: null,
  releaseNotes: '',
  onSetAutoUpdate() {},
  onSkipThisVersion() {},
  onInstallRequest() {},
};

class UpdateWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDownloadUpdateWhenStart: props.isDownloadUpdateWhenStart,
    };
    this.widget = remote.getCurrentWindow();
    this.handleChangeAutoUpdate = this.handleChangeAutoUpdate.bind(this);
    this.handleSkipVersion = this.handleSkipVersion.bind(this);
    this.handleInstallUpdate = this.handleInstallUpdate.bind(this);
    this.handleWindowClose = this.handleWindowClose.bind(this);
  }

  componentDidMount() {
    window.document.title = `Oh-My-Desk ${i18n().update.update}`;
  }

  handleChangeAutoUpdate() {
    this.setState(prevState => ({
      isDownloadUpdateWhenStart: !prevState.isDownloadUpdateWhenStart,
    }));
  }

  handleSkipVersion() {
    const { newVersion, onSkipThisVersion } = this.props;

    onSkipThisVersion(newVersion);
    this.handleWindowClose();
  }

  handleInstallUpdate() {
    const { isDownloadFetch, onInstallRequest } = this.props;

    if (!isDownloadFetch) {
      onInstallRequest();
    }
    this.handleWindowClose();
  }

  handleWindowClose() {
    const { onSetAutoUpdate } = this.props;
    const { isDownloadUpdateWhenStart } = this.state;

    onSetAutoUpdate(isDownloadUpdateWhenStart);
    this.widget.close();
  }

  render() {
    const { newVersion, releaseNotes } = this.props;
    const { isDownloadUpdateWhenStart } = this.state;
    const currentVersion = remote.app.getVersion();
    const text = i18n().update;

    return (
      <div className="UpdateWindow">
        <div className="UpdateWindow__title">
          <img className="UpdateWindow__logo" src={logo} alt="" />
          <p className="UpdateWindow__notice">{text.updateNotice}({currentVersion} {'=>'} {newVersion})</p>
        </div>
        <div className="UpdateWindow__content">
          <p className="UpdateWindow__content-title">
            {text.updateContent}
          </p>
          <div
            className="UpdateWindow__content-note"
            dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
              __html: releaseNotes,
            }}
          />
          <label className="UpdateWindow__checkbox-label" htmlFor="checkbox">
            <input
              className="UpdateWindow__checkbox"
              id="checkbox"
              type="checkbox"
              checked={isDownloadUpdateWhenStart}
              onChange={this.handleChangeAutoUpdate}
            />
            {text.autoUpdater}
          </label>
        </div>
        <div className="UpdateWindow__btn-set">
          <button
            className="Btn--white UpdateWindow__btn-skip"
            type="button"
            onClick={this.handleSkipVersion}
          >
            {text.skipVersion}
          </button>
          <button
            className="Btn--white UpdateWindow__btn-remind"
            type="button"
            onClick={this.handleWindowClose}
          >
            {text.remindLater}
          </button>
          <button
            className="Btn--primary UpdateWindow__btn-install"
            type="button"
            onClick={this.handleInstallUpdate}
          >
            {text.install}
          </button>
        </div>
      </div>
    );
  }
}

UpdateWindow.propTypes = propTypes;
UpdateWindow.defaultProps = defaultProps;

export default UpdateWindow;
