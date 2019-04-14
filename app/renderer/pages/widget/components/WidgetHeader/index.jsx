import React from 'react';
import PropTypes from 'prop-types';
import AddressBar from '../AddressBar';
import TitleBar from '../TitleBar';
import './WidgetHeader.scss';

const propTypes = {
  currentUrl: PropTypes.string,
  defaultUserAgent: PropTypes.string,
  isLoading: PropTypes.bool,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  widget: PropTypes.shape({
    id: PropTypes.string,
    isMakeProgress: PropTypes.bool,
    isOnTop: PropTypes.bool,
    name: PropTypes.string,
    reloadInterval: PropTypes.number,
    url: PropTypes.string,
    userAgent: PropTypes.string,
  }),
  onCloseWidget: PropTypes.func,
  onEditWidget: PropTypes.func,
  onMakeWidget: PropTypes.func,
  onModalOpen: PropTypes.func,
  onUpdateWidgetInfo: PropTypes.func,
};

const defaultProps = {
  currentUrl: '',
  defaultUserAgent: 'DESKTOP',
  isLoading: false,
  widget: {},
  webView: null,
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
      isLoading,
      webView,
      widget,
      onCloseWidget,
      onEditWidget,
      onMakeWidget,
      onModalOpen,
      onUpdateWidgetInfo,
    } = this.props;
    const {
      id,
      isMakeProgress,
      isOnTop,
      name,
      reloadInterval,
      userAgent,
      url,
    } = widget;

    return (
      <div className="WidgetHeader">
        <TitleBar
          defaultUserAgent={defaultUserAgent}
          id={id}
          title={name}
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
