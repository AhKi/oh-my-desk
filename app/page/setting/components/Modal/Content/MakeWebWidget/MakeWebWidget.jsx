import React from 'react';
import PropTypes from 'prop-types';

import OutsideClickHandler from 'components/OutsideClickHandler';
import ValidationInput from 'components/ValidationInput';
import createWidget from 'utils/createWidget';
import validateName from 'utils/validation/widgetName';
import validateUrl from 'utils/validation/widgetUrl';
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
      this.setState({ nameError: validateName(widgetName) });
    };

    const urlCheck = () => {
      this.setState({ urlError: validateUrl(widgetUrl) });
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
          <ValidationInput
            error={nameError}
            name="Name"
            placeholder="Write your site name"
            value={widgetName}
            onChange={this.handleWidgetNameChange}
          />
          <ValidationInput
            error={urlError}
            name="Url"
            placeholder="Keep it 'http://' or 'https://'"
            value={widgetUrl}
            onChange={this.handleWidgetUrlChange}
          />
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
