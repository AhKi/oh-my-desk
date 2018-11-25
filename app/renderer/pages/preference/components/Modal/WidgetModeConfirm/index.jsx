import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'constants/i18n';
import './WidgetModeConfirm.scss';

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
      <div className="WidgetModeConfirm__container">
        <h3>{text.widgetModeConfirmTitle}</h3>
        <p className="WidgetModeConfirm__content">
          {text.widgetModeConfirmContent}
        </p>
        <div className="WidgetModeConfirm__btn-set">
          <button
            className="Btn Btn--sm Btn--gray"
            type="button"
            onClick={onModalClose}
          >
            {text.changedCancel}
          </button>
          <button
            className="Btn Btn--sm Btn--primary"
            type="button"
            onClick={this.handleChange}
          >
            {text.ok}
          </button>
        </div>
      </div>
    );
  }
}

WidgetModeConfirm.propTypes = propTypes;
WidgetModeConfirm.defaultProps = defaultProps;

export default WidgetModeConfirm;
