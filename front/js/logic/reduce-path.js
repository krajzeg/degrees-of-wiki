import {fromJS} from 'immutable';

export const reducePath = action => path => {
  switch(action.type) {
    case 'PATH_GO_TO':
      const {page, cost} = action;
      return path
        .update('pages', pages => pages.push(page))
        .update('costs', costs => costs.push(cost));

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
