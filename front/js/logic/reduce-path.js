import {fromJS} from 'immutable';

export const reducePath = action => path => {
  switch(action.type) {
    case 'PATH_GO_TO':
      return path.push(action.page);

    case 'PATH_GO_BACK_TO':
      // snip everything after a given entry
      // (two reverses because we can't skip from end, and takeUntil would drop the last item)
      return path.reverse().skipUntil(p => p == action.page).reverse();

    default:
      return path;
  }
}
