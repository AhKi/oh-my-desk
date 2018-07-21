import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'constants/i18n';
import ToggleButton from 'page/Components/ToggleButton';

const propTypes = {
  isAutoLaunch: PropTypes.bool,
  widgetMode: PropTypes.string,
  onToggleAutoLaunch: PropTypes.func,
  onToggleWidgetMode: PropTypes.func,
};

const defaultProps = {
  isAutoLaunch: true,
  widgetMode: 'DESKTOP',
  onToggleAutoLaunch() {},
  onToggleWidgetMode() {},
};

class Setting extends React.Component {
  render() {
    const text = i18n().preference;
    const {
      isAutoLaunch,
      widgetMode,
      onToggleAutoLaunch,
      onToggleWidgetMode,
    } = this.props;

    return (
      <div>
        <p>{text.basicSetting}</p>
        <ToggleButton
          isCheck={isAutoLaunch}
          onToggle={onToggleAutoLaunch}
        />
        <span>{text.autoStart}</span>
        <select value={widgetMode} onChange={onToggleWidgetMode}>
          <option value="DESKTOP">{text.desktopMode}</option>
          <option value="MOBILE">{text.mobileMode}</option>
        </select>
      </div>
    );
  }
}

Setting.propTypes = propTypes;
Setting.defaultProps = defaultProps;

export default Setting;
