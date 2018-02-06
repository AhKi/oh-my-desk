import React from 'react';
import PropTypes from 'prop-types';
import './OutsideClickHandler.scss';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onOutSideClick: PropTypes.func,
};
const defaultProps = {
  onOutSideClick() {},
};

class OutsideClickHandler extends React.Component {
  constructor(props) {
    super(props);
    this.handleOutSideClick = this.handleOutSideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutSideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutSideClick);
  }

  handleOutSideClick(e) {
    if (!this.outsideRef.contains(e.target)) {
      this.props.onOutSideClick();
    }
  }

  render() {
    return (
      <div
        className="OutsideClickHandler"
        ref={(ref) => { this.outsideRef = ref; }}
      >
        {this.props.children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;

export default OutsideClickHandler;
