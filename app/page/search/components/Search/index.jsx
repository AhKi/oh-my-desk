import React from 'react';
import SearchInputContainer from '../../containers/SearchInputContainer';
import SearchListContainer from '../../containers/SearchListContainer';
import SearchMenu from '../SearchMenu';
import './Search.scss';

function Search() {
  return (
    <div className="Search">
      <SearchMenu />
      <SearchInputContainer />
      <SearchListContainer />
    </div>
  );
}

export default Search;
