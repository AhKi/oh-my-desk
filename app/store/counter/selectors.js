import { createSelector } from 'reselect';

export const counterSelector = state => state.get('counter');

export const valueSelector = createSelector(
  counterSelector,
  counter => counter.get('value'),
);
