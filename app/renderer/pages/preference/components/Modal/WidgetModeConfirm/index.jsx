import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'constants/i18n';

const propTypes = {
  onChangeMode: PropTypes.func,
  onModalClose: PropTypes.func,
};
const defaultProps = {
  onChangeMode() {},
  onModalClose() {},
};

class WidgetModeConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { onChangeMode, onModalClose } = this.props;

    onChangeMode();
    onModalClose();
  }

  render() {
    const { onModalClose } = this.props;
    const text = i18n().preference;

    return (
      <div>
        <h3>{text.widgetModeConfirmTitle}</h3>
        <p>{text.widgetModeConfirmContent}</p>
        <button
          type="button"
          onClick={onModalClose}
        >
          {text.changedCancel}
        </button>
        <button
          type="button"
          onClick={this.handleChange}
        >
          {text.ok}
        </button>
      </div>
    );
  }
}

WidgetModeConfirm.propTypes = propTypes;
WidgetModeConfirm.defaultProps = defaultProps;

export default WidgetModeConfirm;
