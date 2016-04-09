import {fromJS} from 'immutable';

export const reducePage = action => page => {
  switch(action.type) {
    case 'PAGE_LOAD_STARTED':
      return fromJS({title: action.title, loading: true});
    case 'PAGE_LOAD_RESOLVED':
      return addPropertiesBasedOnHTML(page, action.result).merge({loading: false})
    case 'PAGE_LOAD_FAILED':
      console.error(action.error);
      return page.merge({loading: false});
    default:
      return page;
  }
}

function addPropertiesBasedOnHTML(page, html) {
  const linkCount = (html.match(/<a /g) || []).length
  return page.merge({html, linkCount});
}
