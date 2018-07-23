import React from 'react';
import i18n from 'constants/i18n';
import PropTypes from 'prop-types';
import './SearchInput.scss';

const propTypes = {
  filter: PropTypes.string,
  keyword: PropTypes.string,
  isTrayOpen: PropTypes.bool,
  onChangeKeyword: PropTypes.func,
};
const defaultProps = {
  filter: 'ALL',
  keyword: '',
  isTrayOpen: false,
  onChangeKeyword() {},
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
    const { filter, keyword, onChangeKeyword } = this.props;
    const text = i18n().search;
    const placeholder = filter === 'ALL' ? text.search : text.bookMarkSearch;

    return (
      <input
        className="SearchInput"
        type="text"
        placeholder={placeholder}
        ref={this.inputRef}
        value={keyword}
        onChange={onChangeKeyword}
      />
    );
  }
}

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;

export default SearchInput;
