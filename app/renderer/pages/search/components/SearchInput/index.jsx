import React from 'react';
import { ipcRenderer } from 'electron';
import i18n from 'constants/i18n';
import PropTypes from 'prop-types';
import searchIcon from 'assets/icon/icon-magnifying.svg';
import './SearchInput.scss';

const propTypes = {
  filter: PropTypes.string,
  keyword: PropTypes.string,
  onChangeKeyword: PropTypes.func,
};
const defaultProps = {
  filter: 'ALL',
  keyword: '',
  onChangeKeyword() {},
};

class SearchInput extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
  }

  componentDidMount() {
    this.inputRef.current.focus();
    ipcRenderer.on('tray.show', () => {
      this.inputRef.current.focus();
    });
    ipcRenderer.on('tray.hide', () => {
      this.props.onChangeKeyword('');
    });
  }

  handleChangeKeyword(e) {
    const { onChangeKeyword } = this.props;

    onChangeKeyword(e.target.value);
  }

  render() {
    const { filter, keyword } = this.props;
    const text = i18n().search;
    const placeholder = filter === 'ALL' ? text.search : text.bookMarkSearch;

    return (
      <div className="SearchInput">
        <img className="SearchInput__icon" src={searchIcon} alt="" />
        <input
          className="SearchInput__input"
          type="text"
          placeholder={placeholder}
          ref={this.inputRef}
          value={keyword}
          onChange={this.handleChangeKeyword}
        />
      </div>
    );
  }
}

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;

export default SearchInput;
