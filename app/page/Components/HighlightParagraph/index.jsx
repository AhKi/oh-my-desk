import React from 'react';
import PropTypes from 'prop-types';
import './HighlightParagraph.scss';

const propTypes = {
  content: PropTypes.string.isRequired,
  highlightClass: PropTypes.string,
  keyword: PropTypes.string,
};
const defaultProps = {
  highlightClass: '',
  keyword: '',
};

class HighlightParagraph extends React.Component {
  render() {
    const { content, highlightClass, keyword } = this.props;
    const split = content.split(keyword);
    const { length } = split;

    return (
      <span>
        {split.map((word, index) => {
          if (index === length - 1) {
            return word;
          }
          return [
            word,
            <span key="highlight" className={`highlight ${highlightClass}`}>
              {keyword}
            </span>,
          ];
        })}
      </span>
    );
  }
}

HighlightParagraph.propTypes = propTypes;
HighlightParagraph.defaultProps = defaultProps;

export default HighlightParagraph;
