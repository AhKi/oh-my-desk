import React from 'react';
import './SearchDropdown.scss';

class SearchDropdown extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
  }

  render() {
    return (
      <ul className="SearchDropdown__list">
        <li>Dropdown 1</li>
        <li>Dropdown 2</li>
      </ul>
    );
  }
}

export default SearchDropdown;
