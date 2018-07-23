import React from 'react';
import SearchInputContainer from '../../containers/SearchInputContainer';
import SearchListContainer from '../../containers/SearchListContainer';
import SearchMenu from '../SearchMenu';
import './Search.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'ALL',
      keyword: '',
    };
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
  }

  handleChangeFilter(value) {
    this.setState({ filter: value });
  }

  handleChangeKeyword(e) {
    this.setState({ keyword: e.target.value });
  }

  render() {
    const { filter, keyword } = this.state;

    return (
      <div className="Search">
        <SearchMenu
          filter={filter}
          onChangeFilter={this.handleChangeFilter}
        />
        <SearchInputContainer
          filter={filter}
          keyword={keyword}
          onChangeKeyword={this.handleChangeKeyword}
        />
        <SearchListContainer />
      </div>
    );
  }
}

export default Search;
