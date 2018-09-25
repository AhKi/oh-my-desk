import React from 'react';
import PropTypes from 'prop-types';
import { shell } from 'electron';
import i18n from 'constants/i18n';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  onMakeWidget: PropTypes.func,
  onModalClose: PropTypes.func,
};
const defaultProps = {
  id: '',
  name: '',
  url: '',
  onMakeWidget() {},
  onModalClose() {},
};

class UrlInvalidNotification extends React.Component {
  constructor(props) {
    super(props);
    this.handleMakeWidget = this.handleMakeWidget.bind(this);
    this.handleOpenWindow = this.handleOpenWindow.bind(this);
  }

  handleMakeWidget() {
    const {
      id,
      name,
      url,
      onMakeWidget,
      onModalClose,
    } = this.props;

    onMakeWidget(id, {
      name,
      url,
      isMakeProgress: false,
    });
    onModalClose();
  }

  handleOpenWindow() {
    const { url } = this.props;

    shell.openExternal(url);
  }

  render() {
    const { name, url, onModalClose } = this.props;
    const text = i18n().widget;

    return (
      <div>
        <h3>{text.notFound}</h3>
        <h5>{text.checkUrl}</h5>
        <p>{text.name}</p>
        <p>{name}</p>
        <p>{text.url}</p>
        <p>{url}</p>
        <button
          type="button"
          onClick={this.handleOpenWindow}
        >
          {text.checkUrl}
        </button>
        <button
          type="button"
          onClick={onModalClose}
        >
          {'<'} {text.back}
        </button>
        <button
          type="button"
          onClick={this.handleMakeWidget}
        >
          {text.addWidget}
        </button>
      </div>
    );
  }
}

UrlInvalidNotification.propTypes = propTypes;
UrlInvalidNotification.defaultProps = defaultProps;

export default UrlInvalidNotification;
