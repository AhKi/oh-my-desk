import React from 'react';
import PropTypes from 'prop-types';
import * as USER_AGENT from 'constants/userAgent';

import AddressBar from '../AddressBar';
import TitleBarMac from '../TitleBarMac';
import './WidgetHeader.scss';

const propTypes = {
  title: PropTypes.string,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  userAgent: PropTypes.string,
  url: PropTypes.string,
};

const defaultProps = {
  title: '',
  webView: null,
  userAgent: USER_AGENT.DESKTOP,
  url: '',
};

class WidgetHeader extends React.Component {
  render() {
    const {
      title,
      webView,
      userAgent,
      url,
    } = this.props;

    return (
      <div className="WidgetHeader__title-bar">
        <TitleBarMac
          title={title}
          userAgent={userAgent}
        />
        <AddressBar
          homeUrl={url}
          webView={webView}
        />
      </div>
    );
  }
}

WidgetHeader.propTypes = propTypes;
WidgetHeader.defaultProps = defaultProps;

export default WidgetHeader;
