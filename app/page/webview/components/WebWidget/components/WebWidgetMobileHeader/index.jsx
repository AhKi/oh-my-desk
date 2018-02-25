import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import WidgetSettingIcon from 'assets/icon/icon-widget-setting';
import HistoryGoBackButton from '../Button/HistoryGoBackButton';
import ReloadButton from '../Button/ReloadButton';
import './WebWidgetMobileHeader.scss';

const propTypes = {
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onGoBack: PropTypes.func,
  onGoForward: PropTypes.func,
  onRefresh: PropTypes.func,
  onStopRefresh: PropTypes.func,
  onToggleSetting: PropTypes.func,
};
const defaultProps = {
  isLoading: false,
  isOpen: false,
  webView: null,
  onGoBack() {},
  onGoForward() {},
  onRefresh() {},
  onStopRefresh() {},
  onToggleSetting() {},
};

class WebWidgetMobileHeader extends React.Component {
  render() {
    const {
      isLoading,
      isOpen,
      webView,
      onGoBack,
      onGoForward,
      onRefresh,
      onStopRefresh,
      onToggleSetting,
    } = this.props;
    const headerClassName = cx('WebWidgetMobileHeader', {
      WebWidgetModalHeader__open: isOpen,
    });

    return (
      <div
        className={headerClassName}
      >
        <div className="WebWidgetMobileHeader__front_btn">
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
        <button
          className="WebWidgetMobileHeader__setting"
          type="button"
          onClick={() => onToggleSetting()}
        >
          <WidgetSettingIcon />
        </button>
      </div>
    );
  }
}

WebWidgetMobileHeader.propTypes = propTypes;
WebWidgetMobileHeader.defaultProps = defaultProps;

export default WebWidgetMobileHeader;
