import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  currentPage: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  unit: PropTypes.number,
  onPageClick: PropTypes.func,
};
const defaultProps = {
  unit: 5,
  onPageClick() {},
};

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.renderPageNumber = this.renderPageNumber.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  handlePrevPage() {
    this.props.onPageClick(this.props.currentPage - 1);
  }

  handleNextPage() {
    this.props.onPageClick(this.props.currentPage + 1);
  }

  renderPageNumber() {
    const {
      currentPage,
      maxPage,
      unit,
      onPageClick,
    } = this.props;
    const arr = [];
    const startPage = Math.max(currentPage - 2, 1);

    for (let makePage = startPage; makePage < startPage + unit; makePage += 1) {
      if (makePage > maxPage && arr.length) {
        arr.unshift(arr[0] - 1);
      } else {
        arr.push(makePage);
      }
    }

    return arr.map(v => (
      <button
        type="button"
        data-name="page-button"
        key={v}
        onClick={() => onPageClick(v)}
      >
        {v}
      </button>
    ));
  }

  render() {
    const { currentPage, maxPage } = this.props;

    return (
      <div>
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={this.handlePrevPage}
        >
          <i className="fas fa-caret-left" />
          <span>prev</span>
        </button>
        {this.renderPageNumber()}
        <button
          type="button"
          disabled={currentPage >= maxPage}
          onClick={this.handleNextPage}
        >
          <span>next</span>
          <i className="fas fa-caret-right" />
        </button>
      </div>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
