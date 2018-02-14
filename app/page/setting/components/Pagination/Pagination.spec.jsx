import React from 'react';
import { shallow } from 'enzyme';

import Pagination from './';

describe('<Pagination />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(
      <Pagination
        currentPage={1}
        maxPage={5}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when maxPage < 5', () => {
    const wrapper = shallow(
      <Pagination
        currentPage={1}
        maxPage={2}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when currentPage is attached to maxPage', () => {
    const wrapper = shallow(
      <Pagination
        currentPage={9}
        maxPage={10}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should call onPageClick when call handlePrevPage', () => {
    const onPageClick = jest.fn();
    const wrapper = shallow(
      <Pagination
        currentPage={1}
        maxPage={5}
        onPageClick={onPageClick}
      />,
    );

    wrapper.instance().handlePrevPage();

    expect(onPageClick).toHaveBeenCalledTimes(1);
    expect(onPageClick).toHaveBeenCalledWith(0);
  });

  it('should call onPageClick when call handleNextPage', () => {
    const onPageClick = jest.fn();
    const wrapper = shallow(
      <Pagination
        currentPage={1}
        maxPage={5}
        onPageClick={onPageClick}
      />,
    );

    wrapper.instance().handleNextPage();

    expect(onPageClick).toHaveBeenCalledTimes(1);
    expect(onPageClick).toHaveBeenCalledWith(2);
  });

  it('should call onPageClick when click page button', () => {
    const onPageClick = jest.fn();
    const wrapper = shallow(
      <Pagination
        currentPage={1}
        maxPage={5}
        onPageClick={onPageClick}
      />,
    );
    const btn = wrapper.find('[data-name="page-button"]').at(0);

    btn.simulate('click');

    expect(onPageClick).toHaveBeenCalledTimes(1);
    expect(onPageClick).toHaveBeenCalledWith(1);
  });
});
