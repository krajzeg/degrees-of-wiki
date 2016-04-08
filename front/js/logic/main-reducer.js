import {fromJS} from 'immutable';

import {reducePage} from './reduce-page';
import {reducePath} from './reduce-path';

// This is the state our application starts in.
const initialState = fromJS({
  riddle: {
    path: [],
    pages: {}
  }
});

export default function mainReducer(state = initialState, action) {
  const {type} = action;
  if (type.startsWith('PAGE_')) {
    // These actions have to do with updating a single page.
    return state.updateIn(['riddle', 'pages', action.title], reducePage(action));
  } else if (type.startsWith('PATH_')) {
    return state.updateIn(['riddle', 'path'], reducePath(action));
  } else {
    return state;
  }
}
