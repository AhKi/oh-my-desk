import React from 'react';
import SearchInputContainer from '../../containers/SearchInputContainer';
import SearchList from '../SearchList';
import SearchMenu from '../SearchMenu';
import './Search.scss';

function Search() {
  return (
    <div className="Search">
      <SearchMenu />
      <SearchInputContainer />
      <SearchList />
    </div>
  );
}

export default Search;
