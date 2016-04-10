import {fromJS} from 'immutable';

import {reducePage} from './reduce-page';
import {reducePath} from './reduce-path';
import {reduceRiddle} from './reduce-riddle';

// This is the state our application starts in.
const initialState = fromJS({});

export default function mainReducer(state = initialState, action) {
  const {type} = action;
  if (type.startsWith('PAGE_')) {
    // These actions have to do with updating a single page.
    return state.updateIn(['riddle', 'pages', action.title], reducePage(action));
  } else if (type.startsWith('PATH_')) {
    // These actions update the path in response to the user clicking links.
    return state.updateIn(['riddle', 'path'], reducePath(state.get('riddle'))(action));
  } else if (type.startsWith('RIDDLE_')) {
    // These actions work with the whole riddle - to initialize it, usually.
    return state.updateIn(['riddle'], reduceRiddle(action));
  } else {
    return state;
  }
}
