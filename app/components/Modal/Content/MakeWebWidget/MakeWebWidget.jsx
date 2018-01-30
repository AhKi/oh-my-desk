import React from 'react';
import PropTypes from 'prop-types';
import validUrl from 'valid-url';
import createWidget from 'utils/createWidget';
import './MakeWebWidget.scss';

const propTypes = {
  onModalClose: PropTypes.func,
};

const defaultProps = {
  onModalClose() {},
};

class MakeWebWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetName: '',
      nameError: '',
      widgetUrl: '',
      urlError: '',
    };
    this.handleCreateWidget = this.handleCreateWidget.bind(this);
    this.handleWidgetNameChange = this.handleWidgetNameChange.bind(this);
    this.validateCheck = this.validateCheck.bind(this);
    this.handleWidgetUrlChange = this.handleWidgetUrlChange.bind(this);
  }

  validateCheck(type) {
    const { widgetName, widgetUrl } = this.state;
    const nameCheck = () => {
      if (widgetName.length === 0) {
        this.setState({ nameError: 'Please enter the widget name.' });
      } else {
        this.setState({ nameError: '' });
      }
    };

    const urlCheck = () => {
      if (widgetUrl.length === 0) {
        this.setState({ urlError: 'Please enter the widget url.' });
      } else if (!validUrl.isUri(widgetUrl)) {
        this.setState({ urlError: 'Please match the URL format. (ex: https://www.google.com)' });
      } else {
        this.setState({ urlError: '' });
      }
    };

    switch (type) {
      case 'name':
        nameCheck();
        break;
      case 'url':
        urlCheck();
        break;
      case 'total':
        nameCheck();
        urlCheck();
        break;
      default:
        break;
    }
  }

  handleCreateWidget(e) {
    e.preventDefault();
    const {
      widgetName,
      nameError,
      widgetUrl,
      urlError,
    } = this.state;


    if (!(widgetName && widgetUrl) || (nameError || urlError)) {
      this.validateCheck('total');
      return;
    }

    createWidget('web', {
      name: widgetName,
      url: widgetUrl,
    });
    this.props.onModalClose();
  }

  handleWidgetNameChange(e) {
    this.setState({ widgetName: e.target.value }, () => {
      this.validateCheck('name');
    });
  }

  handleWidgetUrlChange(e) {
    this.setState({ widgetUrl: e.target.value }, () => {
      this.validateCheck('url');
    });
  }

  render() {
    const { onModalClose } = this.props;
    const {
      widgetName,
      widgetUrl,
      nameError,
      urlError,
    } = this.state;

    return (
      <form className="MakeWebWidget">
        <h5 className="MakeWebWidget__title">Make Web Widget</h5>
        <div className="Card">
          <p className="Card__content">Make web widget.<br />Please enter name and URL</p>
          <p className="Card__content--postscript">
            * URL information is easy to copy / paste from browser address bar.
          </p>
        </div>
        <div className="InputSet">
          <p className="InputSet__label">Widget Name</p>
          <input
            className="InputSet__text-input"
            type="text"
            placeholder="web widget name"
            value={widgetName}
            onChange={this.handleWidgetNameChange}
          />
          {nameError && <p className="InputSet__validate-message">{nameError}</p>}
        </div>
        <div className="InputSet">
          <p className="InputSet__label">Widget URL</p>
          <input
            className="InputSet__text-input"
            type="text"
            placeholder="ex) https://www.google.com"
            value={widgetUrl}
            onChange={this.handleWidgetUrlChange}
          />
          {urlError && <p className="InputSet__validate-message">{urlError}</p>}
        </div>
        <div className="MakeWebWidget__button-set">
          <input
            className="Btn Btn--primary Btn-middle"
            type="submit"
            onClick={this.handleCreateWidget}
            value="Make"
          />
          <button
            className="Btn Btn-middle"
            type="button"

            onClick={onModalClose}
          >
            Close
          </button>
        </div>
      </form>
    );
  }
}

MakeWebWidget.propTypes = propTypes;
MakeWebWidget.defaultProps = defaultProps;

export default MakeWebWidget;
