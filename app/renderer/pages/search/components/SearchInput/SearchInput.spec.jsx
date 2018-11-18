import React from 'react';
import { mount } from 'enzyme';
import SearchInput from '.';

describe('Test SearchInput Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot', () => {
    const wrapper = mount(<SearchInput />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when filter !== ALL', () => {
    const wrapper = mount(<SearchInput filter="FAVORITES" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should test componentDidMount', () => {
    const componentDidMount = jest.spyOn(SearchInput.prototype, 'componentDidMount');
    const wrapper = mount(<SearchInput filter="FAVORITES" />);
    const inputRef = wrapper.instance().inputRef.current;

    expect(componentDidMount).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toEqual(inputRef);
  });

  describe('should test componentDidUpdate', () => {
    const componentDidUpdate = jest.spyOn(SearchInput.prototype, 'componentDidUpdate');
    const wrapper = mount(<SearchInput isTrayOpen={false} />);
    const inputRef = wrapper.instance().inputRef.current;
    inputRef.focus = jest.fn();

    it('when isTrayOpen change from false to true', () => {
      expect(wrapper.instance().props.isTrayOpen).toBe(false);
      wrapper.setProps({
        isTrayOpen: true,
      });

      expect(componentDidUpdate).toHaveBeenCalledTimes(1);
      expect(inputRef.focus).toHaveBeenCalledTimes(1);
    });

    it('when isTrayOpen change from false to true', () => {
      expect(wrapper.instance().props.isTrayOpen).toBe(true);
      wrapper.setProps({
        isTrayOpen: false,
      });

      expect(componentDidUpdate).toHaveBeenCalledTimes(1);
      expect(inputRef.focus).toHaveBeenCalledTimes(1);
    });

    it('when isTrayOpen doesn\'t change', () => {
      expect(wrapper.instance().props.isTrayOpen).toBe(false);
      wrapper.setProps({
        isTrayOpen: false,
      });

      expect(componentDidUpdate).toHaveBeenCalledTimes(1);
      expect(inputRef.focus).toHaveBeenCalledTimes(0);
    });
  });

  it('should call props.onChangeKeyword', () => {
    const onChangeKeyword = jest.fn();
    const wrapper = mount(<SearchInput onChangeKeyword={onChangeKeyword} />);
    const event = {
      target: {
        value: 'mock-value',
      },
    };

    wrapper.instance().handleChangeKeyword(event);

    expect(onChangeKeyword).toHaveBeenCalledTimes(1);
    expect(onChangeKeyword).toHaveBeenCalledWith('mock-value');
  });
});
