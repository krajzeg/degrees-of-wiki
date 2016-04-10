import {fromJS} from 'immutable';
import {linkCost} from '../logic/selectors';

export const reducePath = riddle => action => path => {
  switch(action.type) {
    case 'PATH_GO_TO':
      const fromPage = path.get('pages').last(),
        toPage = action.page;
      return path
        .update('pages', pages => pages.push(toPage))
        .update('costs', costs => costs.push(linkCost(riddle, fromPage, toPage)));

    case 'PATH_GO_BACK_TO':
      // snip everything after a given entry
      // (two reverses because we can't skip from end, and takeUntil would drop the last item)
      let pages = path.get('pages'), costs = path.get('costs');
      pages = pages.reverse().skipUntil(p => p == action.page).reverse();
      costs = costs.take(pages.size - 1);

      return path.merge({pages, costs});

    default:
      return path;
  }
}
