import React from 'react';
import PropTypes from 'prop-types';
import validUrl from 'valid-url';

import OutsideClickHandler from 'components/OutsideClickHandler';
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
      <OutsideClickHandler onOutSideClick={onModalClose}>
        <form className="MakeWebWidget">
          <h5 className="MakeWebWidget__title">Make new web widget</h5>
          <div className="InputSet">
            <p className="InputSet__label">Name</p>
            <input
              className="InputSet__text-input"
              type="text"
              placeholder="Write your site name"
              value={widgetName}
              onChange={this.handleWidgetNameChange}
            />
            {nameError && <p className="InputSet__validate-message">{nameError}</p>}
          </div>
          <div className="InputSet">
            <p className="InputSet__label">Url</p>
            <input
              className="InputSet__text-input"
              type="text"
              placeholder="Keep it 'http://' or 'https://'"
              value={widgetUrl}
              onChange={this.handleWidgetUrlChange}
            />
            {urlError && <p className="InputSet__validate-message">{urlError}</p>}
          </div>
          <div className="MakeWebWidget__button-set">
            <button
              className="Btn Btn-middle"
              type="button"

              onClick={onModalClose}
            >
              Close
            </button>
            <input
              className="Btn Btn--primary"
              type="submit"
              onClick={this.handleCreateWidget}
              value="Create New Widget"
            />
          </div>
        </form>
      </OutsideClickHandler>
    );
  }
}

MakeWebWidget.propTypes = propTypes;
MakeWebWidget.defaultProps = defaultProps;

export default MakeWebWidget;
