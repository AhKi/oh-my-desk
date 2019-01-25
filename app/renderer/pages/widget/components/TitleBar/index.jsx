import React from 'react';
import PropTypes from 'prop-types';
import Svg from 'react-svg-inline';
import cx from 'classnames';
import * as USER_AGENT from 'constants/userAgent';
import closeIcon from 'assets/icon/icon-widget-close.svg';
import desktopIcon from 'assets/icon/icon-desktop-white.svg';
import mobileIcon from 'assets/icon/icon-mobile-white.svg';
import './TitleBar.scss';

const propTypes = {
  defaultUserAgent: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  userAgent: PropTypes.string,
  onCloseWidget: PropTypes.func,
  onUpdateWidgetInfo: PropTypes.func,
};
const defaultProps = {
  defaultUserAgent: 'DESKTOP',
  id: '',
  title: 'Empty Widget',
  userAgent: '',
  onCloseWidget() {},
  onUpdateWidgetInfo() {},
};

class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseWidget = this.handleCloseWidget.bind(this);
    this.handleSetMobileAgent = this.handleSetMobileAgent.bind(this);
    this.handleSetDesktopAgent = this.handleSetDesktopAgent.bind(this);
  }

  handleCloseWidget() {
    const { id, onCloseWidget } = this.props;

    onCloseWidget(id);
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
    const mobileIconClass = cx('TitleBar__mobile-icon', {
      'TitleBar__icon--active': userAgent === USER_AGENT.MOBILE,
    });
    const desktopIconClass = cx('TitleBar__desktop-icon', {
      'TitleBar__icon--active': userAgent === USER_AGENT.MOBILE,
    });

    return (
      <div className="TitleBar">
        <button
          className="TitleBar__close-btn"
          type="button"
          onClick={this.handleCloseWidget}
        >
          <Svg className="TitleBar__close-img" svg={closeIcon} />
        </button>
        <div className="TitleBar__title">{title}</div>
        <div className="TitleBar__asset">
          <button
            className="TitleBar__button"
            disabled={currentUserAgent === 'MOBILE'}
            type="button"
            onClick={this.handleSetMobileAgent}
          >
            <Svg
              className={mobileIconClass}
              svg={mobileIcon}
            />
          </button>
          <button
            className="TitleBar__button"
            disabled={currentUserAgent === 'DESKTOP'}
            type="button"
            onClick={this.handleSetDesktopAgent}
          >
            <Svg
              className={desktopIconClass}
              svg={desktopIcon}
            />
          </button>
        </div>
      </div>
    );
  }
}

TitleBar.propTypes = propTypes;
TitleBar.defaultProps = defaultProps;

export default TitleBar;
