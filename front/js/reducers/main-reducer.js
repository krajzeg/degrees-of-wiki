import {fromJS} from 'immutable';

import {reduceEntry} from './reduce-entry';

// This is the state our application starts in.
const initialState = fromJS({});

export default function mainReducer(state = initialState, action) {
  const {type} = action;
  if (type.startsWith('ENTRY_')) {
    // These actions have to do with updating a single entry.
    return state.updateIn(['entry'], reduceEntry(action));
  } else {
    return state;
  }
}
