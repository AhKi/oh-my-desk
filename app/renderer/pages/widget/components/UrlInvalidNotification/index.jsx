import React from 'react';
import PropTypes from 'prop-types';
import { shell } from 'electron';
import Svg from 'react-svg-inline';
import i18n from 'constants/i18n';
import iconExclamation from 'assets/icon/icon-exclamation.svg';
import './UrlInvalidNotification.scss';

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
      <div className="UrlInvalidNotification__container">
        <div className="UrlInvalidNotification__header">
          <Svg
            className="UrlInvalidNotification__image"
            svg={iconExclamation}
          />
          <p className="UrlInvalidNotification__title">
            <h6>{text.notFound}</h6>
            <p>{text.checkUrl}</p>
          </p>
        </div>
        <div className="UrlInvalidNotification__content">
          <p className="UrlInvalidNotification__name">
            <p className="UrlInvalidNotification__label">{text.name}</p>
            <p className="UrlInvalidNotification__text">{name}</p>
          </p>
          <p className="UrlInvalidNotification__url">
            <p className="UrlInvalidNotification__label">{text.url}</p>
            <p className="UrlInvalidNotification__text UrlInvalidNotification__text-url">
              <p className="UrlInvalidNotification__url-list">{url}</p>
              <button
                className="UrlInvalidNotification__check-btn Btn"
                type="button"
                onClick={this.handleOpenWindow}
              >
                {text.checkSite}
              </button>
            </p>
          </p>
        </div>
        <div className="UrlInvalidNotification__Button-set">
          <button
            className="Btn Btn--gray Btn--sm"
            type="button"
            onClick={onModalClose}
          >
            {'<'} {text.back}
          </button>
          <button
            className="Btn Btn--primary Btn--sm"
            type="button"
            onClick={this.handleMakeWidget}
          >
            {text.addWidget}
          </button>
        </div>
      </div>
    );
  }
}

UrlInvalidNotification.propTypes = propTypes;
UrlInvalidNotification.defaultProps = defaultProps;

export default UrlInvalidNotification;
