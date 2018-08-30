import React from 'react';
import PropTypes from 'prop-types';

import AddressBar from '../AddressBar/index';
import TitleBarMac from '../TitleBarMac/index';
import './WidgetHeader.scss';

const propTypes = {
  currentUrl: PropTypes.string,
  defaultUserAgent: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  isOnTop: PropTypes.bool,
  isLoading: PropTypes.bool,
  reloadInterval: PropTypes.number,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  userAgent: PropTypes.string,
  url: PropTypes.string,
  onModalOpen: PropTypes.func,
  onUpdateWidgetInfo: PropTypes.func,
};

const defaultProps = {
  currentUrl: '',
  defaultUserAgent: 'DESKTOP',
  title: '',
  id: '',
  isOnTop: false,
  isLoading: false,
  reloadInterval: 0,
  webView: null,
  userAgent: '',
  url: '',
  onModalOpen() {},
  onUpdateWidgetInfo() {},
};

class WidgetHeader extends React.Component {
  render() {
    const {
      currentUrl,
      defaultUserAgent,
      title,
      id,
      isOnTop,
      isLoading,
      reloadInterval,
      webView,
      userAgent,
      url,
      onModalOpen,
      onUpdateWidgetInfo,
    } = this.props;

    return (
      <div className="WidgetHeader__title-bar">
        <TitleBarMac
          defaultUserAgent={defaultUserAgent}
          id={id}
          title={title}
          userAgent={userAgent}
          onUpdateWidgetInfo={onUpdateWidgetInfo}
        />
        <AddressBar
          currentUrl={currentUrl}
          homeUrl={url}
          id={id}
          isOnTop={isOnTop}
          isLoading={isLoading}
          reloadInterval={reloadInterval}
          webView={webView}
          onModalOpen={onModalOpen}
          onUpdateWidgetInfo={onUpdateWidgetInfo}
        />
      </div>
    );
  }
}

WidgetHeader.propTypes = propTypes;
WidgetHeader.defaultProps = defaultProps;

export default WidgetHeader;
