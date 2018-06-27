import React from 'react';
import PropTypes from 'prop-types';
import './Confirm.scss';

const propTypes = {
  btnText: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  onModalClose: PropTypes.func,
};
const defaultProps = {
  btnText: 'OK',
  content: '',
  title: '',
  onModalClose() {},
};

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.handleEnterEvent = this.handleEnterEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEnterEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEnterEvent);
  }

  handleEnterEvent(e) {
    const { onModalClose } = this.props;
    if (e.keyCode === 13) {
      onModalClose();
    }
  }

  render() {
    const {
      btnText,
      content,
      title,
      onModalClose,
    } = this.props;

    return (
      <div className="Confirm">
        <h6 className="Confirm__title space-2x">
          <strong>
            {title}
          </strong>
        </h6>
        <span
          className="Confirm__content space-4x"
        >
          {content.split('\n').map((line, index) => ( // eslint-disable-next-line react/no-array-index-key
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </span>
        <div className="Confirm__btn-box">
          <button
            type="button"
            className="Btn Btn--primary Btn--sm"
            onClick={onModalClose}
          >
            {btnText}
          </button>
        </div>
      </div>
    );
  }
}

Confirm.propTypes = propTypes;
Confirm.defaultProps = defaultProps;

export default Confirm;
