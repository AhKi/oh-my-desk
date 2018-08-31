import React from 'react';
import { shallow } from 'enzyme';
import Immutable from 'immutable';

import toJS from '.';

function Div(props) { return <div {...props} />; }

describe('toJS', () => {
  it('should convert all props with immutable object to pure javascript type', () => {
    const array = [1, 2, 3];
    const number = 1;
    const object = { a: 1 };
    const ToJSDiv = toJS(Div);
    const wrapper = shallow((
      <ToJSDiv
        array={array}
        number={number}
        object={object}
        list={Immutable.List()}
        map={Immutable.Map()}
        immutableInMap={Immutable.Map({
          list: Immutable.List(),
          map: Immutable.Map(),
        })}
      />
    ));
    const mockProps = wrapper.props();

    expect(mockProps.array).toEqual(array);
    expect(mockProps.number).toBe(number);
    expect(mockProps.object).toEqual(object);
    expect(Immutable.is(mockProps.list, Immutable.List())).toBe(false);
    expect(Immutable.is(mockProps.map, Immutable.Map())).toBe(false);
    expect(Immutable.is(mockProps.immutableInMap.list, Immutable.List())).toBe(false);
    expect(Immutable.is(mockProps.immutableInMap.map, Immutable.Map())).toBe(false);
  });

  it('should add wrapped component displayName with toJS()', () => {
    const wrappedComponentName = Div.name;
    const { displayName } = toJS(Div);
    expect(displayName).toBe(`toJS(${wrappedComponentName})`);
  });
});
