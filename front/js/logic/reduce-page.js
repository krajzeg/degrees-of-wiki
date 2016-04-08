import {fromJS} from 'immutable';

export const reducePage = action => page => {
  switch(action.type) {
    case 'PAGE_LOAD_STARTED':
      return fromJS({title: action.title});
    case 'PAGE_LOAD_RESOLVED':
      return page.set('html', action.result);
    case 'PAGE_LOAD_FAILED':
      console.error(action.error);
      return page;
    default:
      return page;
  }
}
