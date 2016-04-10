import $ from 'jquery';
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
  var $html = $('<div></div>');
  $html.html(html);

  const pageLinks = $html.find('a[href^="page://"]').toArray();
  const links = pageLinks.map(link =>
    $(link).attr('href').replace('page://', '')
  );

  return page.merge({html, links});
}
