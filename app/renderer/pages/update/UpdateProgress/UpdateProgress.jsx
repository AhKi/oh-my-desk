import React from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import cx from 'classnames';
import i18n from 'constants/i18n/index';
import logo from 'assets/logo/logo-black-mini.svg';
import './UpdateProgress.scss';

const propTypes = {
  currentProgress: PropTypes.number,
  isDownload: PropTypes.bool,
  totalProgress: PropTypes.number,
  newVersion: PropTypes.string,
  onCancelDownload: PropTypes.func,
};
const defaultProps = {
  currentProgress: 0,
  isDownload: false,
  totalProgress: 0,
  newVersion: '',
  onCancelDownload() {},
};

class UpdateProgress extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleClickButton() {
    const { isDownload, onCancelDownload } = this.props;

    if (isDownload) {
      onCancelDownload();
    } else {
      remote.app.relaunch();
      remote.app.quit();
    }
    remote.getCurrentWindow().close();
  }

  render() {
    const text = i18n().update;
    const {
      currentProgress,
      isDownload,
      totalProgress,
      newVersion,
    } = this.props;
    const btnClassName = cx('Btn', 'UpdateProgress__btn', {
      'Btn--gray': isDownload,
      'Btn--primary': !isDownload,
    });

    return (
      <div className="UpdateProgress">
        <div className="UpdateProgress__title">
         Oh-My-Desk {text.downloading}
        </div>
        <div className="UpdateProgress__content">
          <img className="UpdateProgress__logo" src={logo} alt="" />
          <p className="UpdateProgress__notice">
            Oh-My-Desk v.{newVersion} {text.downloadNotice}
          </p>
          <div className="UpdateProgress__progress-bar">
            <div
              className="UpdateProgress__progress-bar-gauge"
              style={{
                width: `${currentProgress / totalProgress * 100}%`,
              }}
            />
          </div>
          <p className="UpdateProgress__progress-rate">
            {currentProgress}MB / {totalProgress}MB
          </p>
          <button
            className={btnClassName}
            type="button"
            onClick={this.handleClickButton}
          >
            {isDownload ? text.cancel : text.restart}
          </button>
        </div>
      </div>
    );
  }
}

UpdateProgress.propTypes = propTypes;
UpdateProgress.defaultProps = defaultProps;

export default UpdateProgress;
