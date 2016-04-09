import {fromJS} from 'immutable';

export const reducePage = action => page => {
  switch(action.type) {
    case 'PAGE_LOAD_STARTED':
      return fromJS({title: action.title});
    case 'PAGE_LOAD_RESOLVED':
      return addPropertiesBasedOnHTML(page, action.result);
    case 'PAGE_LOAD_FAILED':
      console.error(action.error);
      return page;
    default:
      return page;
  }
}

function addPropertiesBasedOnHTML(page, html) {
  const linkCount = (html.match(/<a /g) || []).length
  return page.merge({html, linkCount});
}
