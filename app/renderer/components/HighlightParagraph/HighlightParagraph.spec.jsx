import React from 'react';
import { shallow } from 'enzyme';
import HighlightParagraph from '.';

describe('Test Search Component', () => {
  describe('should match to snapshot', () => {
    it('when one keyword and doesn\'t matched', () => {
      const content = 'mock mock';
      const keyword = 'target';
      const wrapper = shallow(
        <HighlightParagraph
          content={content}
          keyword={keyword}
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('when one keyword and one matched content', () => {
      const content = 'mock target mock';
      const keyword = 'target';
      const wrapper = shallow(
        <HighlightParagraph
          content={content}
          keyword={keyword}
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('when one keyword and several matched content', () => {
      const content = 'mock target mock target target';
      const keyword = 'target';
      const wrapper = shallow(
        <HighlightParagraph
          content={content}
          keyword={keyword}
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('when two keyword and one matched', () => {
      const content = 'mock target mock target target';
      const keyword = 'target target2';
      const wrapper = shallow(
        <HighlightParagraph
          content={content}
          keyword={keyword}
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('when two keyword and two matched', () => {
      const content = 'mock target mock two target';
      const keyword = 'target two';
      const wrapper = shallow(
        <HighlightParagraph
          content={content}
          keyword={keyword}
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('when two keyword and two matched overlapped', () => {
      const content = 'mock target mock two target';
      const keyword = 'target rge';
      const wrapper = shallow(
        <HighlightParagraph
          content={content}
          keyword={keyword}
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
