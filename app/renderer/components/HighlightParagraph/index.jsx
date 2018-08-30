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
    /**
     * Highlight for Searched Keyword
     *
     * 1. separate keyword by white space
     * 2. find index of content about each keyword
     * 3. remove duplicate area about index of content.
     * 4. make highlight content appended <span> tag.
     */
    const { content, highlightClass, keyword } = this.props;
    const keywordSet = keyword.trim().split(' ');
    const highlightIndex = [];

    keywordSet.forEach((keywordItem) => {
      const splitContent = content.split(keywordItem);
      const { length } = splitContent;
      let count = 0;

      splitContent.forEach((splitItem, index) => {
        if (index === length - 1) {
          return;
        }

        count += splitItem.length;
        highlightIndex.push({ type: 'FIRST', index: count });
        count += keywordItem.length;
        highlightIndex.push({ type: 'LAST', index: count });
      });
    });
    highlightIndex.sort((l, r) => l.index - r.index);

    let firstCount = 0;
    let lastCount = 0;
    const result = [];
    highlightIndex.forEach((checkItem) => {
      if (checkItem.type === 'FIRST') {
        if (firstCount === 0) {
          result.push(checkItem);
        }
        firstCount += 1;
      }

      if (checkItem.type === 'LAST') {
        lastCount += 1;
        if (firstCount === lastCount) {
          result.push(checkItem);
          firstCount = 0;
          lastCount = 0;
        }
      }
    });

    let firstIndex;
    let lastIndex = 0;
    const render = result.map((item, index) => {
      if (item.type === 'FIRST') {
        firstIndex = item.index;
        return content.substring(lastIndex, firstIndex);
      }

      lastIndex = item.index;
      return (
        <span
          className={`highlight ${highlightClass}`}
          key={index} // eslint-disable-line react/no-array-index-key
        >
          {content.substring(firstIndex, lastIndex)}
        </span>
      );
    });
    render.push(content.substring(lastIndex, content.length));

    return (
      <span>
        {render}
      </span>
    );
  }
}

HighlightParagraph.propTypes = propTypes;
HighlightParagraph.defaultProps = defaultProps;

export default HighlightParagraph;
