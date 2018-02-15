import React from 'react';
import PropTypes from 'prop-types';
import HistoryGoBackButton from '../Button/HistoryGoBackButton';
import ReloadButton from '../Button/ReloadButton';
import './WebWidgetMobileHeader.scss';

const propTypes = {
  isLoading: PropTypes.bool,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onGoBack: PropTypes.func,
  onGoForward: PropTypes.func,
  onRefresh: PropTypes.func,
  onStopRefresh: PropTypes.func,
};
const defaultProps = {
  isLoading: false,
  webView: null,
  onGoBack() {},
  onGoForward() {},
  onRefresh() {},
  onStopRefresh() {},
};

class WebWidgetMobileHeader extends React.Component {
  render() {
    const {
      webView,
      isLoading,
      onGoBack,
      onGoForward,
      onRefresh,
      onStopRefresh,
    } = this.props;

    return (
      <div
        className="WebWidgetMobileHeader"
      >
        <HistoryGoBackButton
          isCanGoBack={webView && webView.canGoBack()}
          isCanGoForward={webView && webView.canGoForward()}
          onGoBack={onGoBack}
          onGoForward={onGoForward}
        />
        <ReloadButton
          isLoading={isLoading}
          onRefresh={onRefresh}
          onStopRefresh={onStopRefresh}
        />
      </div>
    );
  }
}

WebWidgetMobileHeader.propTypes = propTypes;
WebWidgetMobileHeader.defaultProps = defaultProps;

export default WebWidgetMobileHeader;
