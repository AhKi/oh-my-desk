import React from 'react';
import { mount } from 'enzyme';
import { ipcRenderer } from 'electron';
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

  describe('should test componentDidMount', () => {
    const componentDidMount = jest.spyOn(SearchInput.prototype, 'componentDidMount');

    it('should focus input element', () => {
      const wrapper = mount(<SearchInput />);
      const inputRef = wrapper.instance().inputRef.current;

      expect(componentDidMount).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toEqual(inputRef);
    });

    it('should match number of event that handled IPC', () => {
      mount(<SearchInput />);

      expect(ipcRenderer.on).toHaveBeenCalledTimes(2);
    });

    describe('should test IPC callback function', () => {
      it('when tray.show', () => {
        const wrapper = mount(<SearchInput />);
        const inputRef = wrapper.instance().inputRef.current;
        const showCb = ipcRenderer.on.mock.calls.filter(i => i[0] === 'tray.show')[0][1];

        inputRef.blur();
        expect(document.activeElement).not.toEqual(inputRef);
        showCb();
        expect(document.activeElement).toEqual(inputRef);
      });

      it('when tray.hide', () => {
        const onChangeKeyword = jest.fn();
        mount(<SearchInput onChangeKeyword={onChangeKeyword} />);
        const hideCb = ipcRenderer.on.mock.calls.filter(i => i[0] === 'tray.hide')[0][1];
        hideCb();

        expect(onChangeKeyword).toHaveBeenNthCalledWith(1, '');
      });
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
