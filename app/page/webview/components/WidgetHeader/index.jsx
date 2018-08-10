import React from 'react';
import PropTypes from 'prop-types';
import * as USER_AGENT from 'constants/userAgent';

import AddressBar from '../AddressBar';
import TitleBarMac from '../TitleBarMac';
import './WidgetHeader.scss';

const propTypes = {
  currentUrl: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  isOnTop: PropTypes.bool,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  userAgent: PropTypes.string,
  url: PropTypes.string,
  onUpdateWidgetInfo: PropTypes.func,
};

const defaultProps = {
  currentUrl: '',
  title: '',
  id: '',
  isOnTop: false,
  webView: null,
  userAgent: USER_AGENT.DESKTOP,
  url: '',
  onUpdateWidgetInfo() {},
};

class WidgetHeader extends React.Component {
  render() {
    const {
      currentUrl,
      title,
      id,
      isOnTop,
      webView,
      userAgent,
      url,
      onUpdateWidgetInfo,
    } = this.props;

    return (
      <div className="WidgetHeader__title-bar">
        <TitleBarMac
          title={title}
          userAgent={userAgent}
        />
        <AddressBar
          currentUrl={currentUrl}
          homeUrl={url}
          id={id}
          isOnTop={isOnTop}
          webView={webView}
          onUpdateWidgetInfo={onUpdateWidgetInfo}
        />
      </div>
    );
  }
}

WidgetHeader.propTypes = propTypes;
WidgetHeader.defaultProps = defaultProps;

export default WidgetHeader;
