/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import os from 'os';
import staticKeyCode from 'constants/keycode';
import './ConfigureHotKey.scss';

const propTypes = {
  hotKey: PropTypes.string,
  onUpdateHotKey: PropTypes.func,
};

const defaultProps = {
  hotKey: '',
  onUpdateHotKey() {},
};

class ConfigureHotKey extends React.Component {
  static listenKey(e, prevKey) {
    const {
      altKey, // 18
      ctrlKey, // 17
      keyCode,
      metaKey, // 91
      shiftKey, // 16
    } = e;
    const isNotMetaKey = keyCode !== 18 && keyCode !== 17 && keyCode !== 91 && keyCode !== 16;
    const comKey = [];

    if (!isNotMetaKey) {
      return prevKey;
    }

    if (ctrlKey) comKey.push('Ctrl');
    if (altKey) comKey.push('Alt');
    if (metaKey) comKey.push('Cmd');
    if (shiftKey) comKey.push('Shift');

    comKey.push(staticKeyCode[keyCode]);

    return comKey.join(' + ');
  }

  static fromSettingKeyToVisibleKey(settingKey) {
    const isMac = os.platform() === 'darwin';

    if (isMac) {
      return settingKey
        .replace('Alt', '⌥')
        .replace('Ctrl', '⌃')
        .replace('Cmd', '⌘')
        .replace('Shift', '⇧');
    }

    return settingKey;
  }

  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      key: ConfigureHotKey.fromSettingKeyToVisibleKey(props.hotKey),
    };
  }

  handleStartEditMode = () => {
    const { isEditMode } = this.state;

    if (!isEditMode) {
      this.setState({ isEditMode: true });
      window.addEventListener('keydown', this.handleSetHotKey);
    }
  };

  handleEndEditMode = () => {
    const { onUpdateHotKey } = this.props;
    const { key } = this.state;

    this.setState({ isEditMode: false });
    window.removeEventListener('keydown', this.handleSetHotKey);

    onUpdateHotKey(key);
  };

  handleSetHotKey = (e) => {
    const { key: prevKey } = this.state;
    const settingKey = ConfigureHotKey.listenKey(e, prevKey);

    this.setState({ key: settingKey });
  };

  render() {
    const { isEditMode, key } = this.state;
    const containerClassName = cx('ConfigureHotKey', {
      ConfigureHotKey__edit: isEditMode,
    });

    return (
      <input
        className={containerClassName}
        readOnly
        value={ConfigureHotKey.fromSettingKeyToVisibleKey(key)}
        onClick={this.handleStartEditMode}
        onBlur={this.handleEndEditMode}
      />
    );
  }
}

ConfigureHotKey.propTypes = propTypes;
ConfigureHotKey.defaultProps = defaultProps;

export default ConfigureHotKey;
