import {fromJS} from 'immutable';

export const reduceEntry = action => entry => {
  switch(action.type) {
    case 'ENTRY_LOAD_STARTED':
      return fromJS({title: action.title});
    case 'ENTRY_LOAD_RESOLVED':
      return entry.set('html', action.result);
    case 'ENTRY_LOAD_FAILED':
      console.error(action.error);
      return entry;
    default:
      return entry;
  }
}
