import {currentPage, riddle} from '../logic/selectors';

// This creates a Redux store subscriber which will trigger a LOAD_PAGE
// action whenever the currently displayed page doesn't have content loaded.
// This makes it easier to make sure the content gets loaded regardless
// of what action caused it to be needed.
export default function(store, loadPage) {
  return () => {
    const state = store.getState();

    // determine what page is currently visible (if any)
    const pageTitle = state.getIn(['riddle', 'path', 'pages']).last(),
      pages = state.getIn(['riddle', 'pages']);

    if (pageTitle && !pages.has(pageTitle)) {
      // we need to load that page
      store.dispatch(loadPage(pageTitle));
    }
  };
}
