import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'constants/i18n';
import './MakeNotice.scss';

const propTypes = {
  onCloseNotice: PropTypes.func,
};
const defaultProps = {
  onCloseNotice() {},
};

class MakeNotice extends React.Component {
  render() {
    const { onCloseNotice } = this.props;
    const text = i18n().widget;

    return (
      <div className="MakeNotice__bar" key="bar">
        <p className="MakeNotice__bar-text">{text.makeBarContent}</p>
        <button
          className="MakeNotice__bar-btn"
          type="button"
          onClick={onCloseNotice}
        >
          {text.makeWidget} {'>'}
        </button>
      </div>
    );
  }
}

MakeNotice.propTypes = propTypes;
MakeNotice.defaultProps = defaultProps;

export default MakeNotice;
