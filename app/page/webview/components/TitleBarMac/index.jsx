import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as USER_AGENT from 'constants/userAgent';
import mobileIcon from 'assets/icon/icon-widget-setting.svg';
import desktopIcon from 'assets/icon/icon-widget-setting.svg';
import './TitleBarMac.scss';

const propTypes = {
  title: PropTypes.string,
  userAgent: PropTypes.string,
};
const defaultProps = {
  title: 'Empty Widget',
  userAgent: USER_AGENT.DESKTOP,
};

class TitleBarMac extends React.Component {
  render() {
    const { title, userAgent } = this.props;
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
          <button className="TitleBarMac__button" type="button">
            <img
              className={mobileIconClass}
              src={mobileIcon}
              alt=""
            />
          </button>
          <button className="TitleBarMac__button" type="button">
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
