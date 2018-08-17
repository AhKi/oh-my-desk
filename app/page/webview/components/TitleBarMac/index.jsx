import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as USER_AGENT from 'constants/userAgent';
import mobileIcon from 'assets/icon/icon-widget-setting.svg';
import desktopIcon from 'assets/icon/icon-widget-setting.svg';
import './TitleBarMac.scss';

const propTypes = {
  defaultUserAgent: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  userAgent: PropTypes.string,
  onUpdateWidgetInfo: PropTypes.func,
};
const defaultProps = {
  defaultUserAgent: 'DESKTOP',
  id: '',
  title: 'Empty Widget',
  userAgent: '',
  onUpdateWidgetInfo() {},
};

class TitleBarMac extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetMobileAgent = this.handleSetMobileAgent.bind(this);
    this.handleSetDesktopAgent = this.handleSetDesktopAgent.bind(this);
  }

  handleSetMobileAgent() {
    const { id, onUpdateWidgetInfo } = this.props;

    onUpdateWidgetInfo(id, {
      userAgent: 'MOBILE',
    });
  }

  handleSetDesktopAgent() {
    const { id, onUpdateWidgetInfo } = this.props;

    onUpdateWidgetInfo(id, {
      userAgent: 'DESKTOP',
    });
  }

  render() {
    const { title, defaultUserAgent, userAgent } = this.props;
    const currentUserAgent = userAgent || defaultUserAgent;
    const mobileIconClass = cx('TitleBarMac__mobile-icon', {
      'TitleBarMac__icon--active': userAgent === USER_AGENT.MOBILE,
    });
    const desktopIconClass = cx('TitleBarMac__desktop-icon', {
      'TitleBarMac__icon--active': userAgent === USER_AGENT.MOBILE,
    });

    if (process.platform !== 'darwin') {
      return null;
    }

    return (
      <div className="TitleBarMac">
        <div className="TitleBarMac__traffic-light" />
        <div className="TitleBarMac__title">{title}</div>
        <div className="TitleBarMac__asset">
          <button
            className="TitleBarMac__button"
            disabled={currentUserAgent === 'MOBILE'}
            type="button"
            onClick={this.handleSetMobileAgent}
          >
            <img
              className={mobileIconClass}
              src={mobileIcon}
              alt=""
            />
          </button>
          <button
            className="TitleBarMac__button"
            disabled={currentUserAgent === 'DESKTOP'}
            type="button"
            onClick={this.handleSetDesktopAgent}
          >
            <img
              className={desktopIconClass}
              src={desktopIcon}
              alt=""
            />
          </button>
        </div>
      </div>
    );
  }
}

TitleBarMac.propTypes = propTypes;
TitleBarMac.defaultProps = defaultProps;

export default TitleBarMac;
