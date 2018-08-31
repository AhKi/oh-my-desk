import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Iterable } from 'immutable';

/**
 * Higher Order Component that converts Immutable.js props to pure javascript data type
 * @param {Function} WrappedComponent
 * @returns {Function} New Component that converted immutable props to pure javascript data
 */
function index(WrappedComponent) {
  function ToJS(wrappedComponentProps) {
    const KEY = 0;
    const VALUE = 1;

    const propsJS = Object
      .entries(wrappedComponentProps)
      .reduce((newProps, wrappedComponentProp) => {
        // eslint-disable-next-line no-param-reassign
        newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(wrappedComponentProp[VALUE]) ?
          wrappedComponentProp[VALUE].toJS() :
          wrappedComponentProp[VALUE];

        return newProps;
      }, {});

    return <WrappedComponent {...propsJS} />;
  }

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ToJS.displayName = `toJS(${wrappedComponentName})`;

  return hoistNonReactStatics(ToJS, WrappedComponent);
}

export default index;
