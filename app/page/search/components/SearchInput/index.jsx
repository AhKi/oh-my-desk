import React from 'react';
import i18n from 'constants/i18n';
import PropTypes from 'prop-types';
import './SearchInput.scss';

const propTypes = {
  isTrayOpen: PropTypes.bool,
};
const defaultProps = {
  isTrayOpen: false,
};

class SearchInput extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  componentDidUpdate(prevProps) {
    const { isTrayOpen } = this.props;

    if (prevProps.isTrayOpen !== isTrayOpen) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const text = i18n().search;

    return (
      <input
        className="SearchInput"
        type="text"
        placeholder={text.search}
        ref={this.inputRef}
      />
    );
  }
}

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;

export default SearchInput;
