import {fromJS} from 'immutable';

import {reducePage} from './reduce-page';

// This is the state our application starts in.
const initialState = fromJS({});

export default function mainReducer(state = initialState, action) {
  const {type} = action;
  if (type.startsWith('PAGE_')) {
    // These actions have to do with updating a single page.
    return state.updateIn(['page'], reducePage(action));
  } else {
    return state;
  }
}
