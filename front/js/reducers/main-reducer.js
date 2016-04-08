import {fromJS} from 'immutable';

import {reduceEntry} from './reduce-entry';

const initialState = fromJS({});

export function mainReducer(state = initialState, action) {
  const {type} = action;
  if (type.startsWith('ENTRY_')) {
    return state.updateIn(['entry'], reduceEntry(action));
  } else {
    return state;
  }
}
