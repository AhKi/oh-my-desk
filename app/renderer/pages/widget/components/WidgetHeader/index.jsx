import React from 'react';
import PropTypes from 'prop-types';

import AddressBar from '../AddressBar';
import TitleBar from '../TitleBar';
import './WidgetHeader.scss';

const propTypes = {
  currentUrl: PropTypes.string,
  defaultUserAgent: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  isMakeProgress: PropTypes.bool,
  isOnTop: PropTypes.bool,
  isLoading: PropTypes.bool,
  reloadInterval: PropTypes.number,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  userAgent: PropTypes.string,
  url: PropTypes.string,
  onCloseWidget: PropTypes.func,
  onEditWidget: PropTypes.func,
  onMakeWidget: PropTypes.func,
  onModalOpen: PropTypes.func,
  onUpdateWidgetInfo: PropTypes.func,
};

const defaultProps = {
  currentUrl: '',
  defaultUserAgent: 'DESKTOP',
  title: '',
  id: '',
  isMakeProgress: false,
  isOnTop: false,
  isLoading: false,
  reloadInterval: 0,
  webView: null,
  userAgent: '',
  url: '',
  onCloseWidget() {},
  onEditWidget() {},
  onMakeWidget() {},
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
      isMakeProgress,
      isOnTop,
      isLoading,
      reloadInterval,
      webView,
      userAgent,
      url,
      onCloseWidget,
      onEditWidget,
      onMakeWidget,
      onModalOpen,
      onUpdateWidgetInfo,
    } = this.props;

    return (
      <div className="WidgetHeader">
        <TitleBar
          defaultUserAgent={defaultUserAgent}
          id={id}
          title={title}
          userAgent={userAgent}
          onCloseWidget={onCloseWidget}
          onUpdateWidgetInfo={onUpdateWidgetInfo}
        />
        <AddressBar
          currentUrl={currentUrl}
          homeUrl={url}
          id={id}
          isMakeProgress={isMakeProgress}
          isOnTop={isOnTop}
          isLoading={isLoading}
          reloadInterval={reloadInterval}
          webView={webView}
          onEditWidget={onEditWidget}
          onMakeWidget={onMakeWidget}
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
