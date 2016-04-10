import {currentPage, riddle} from '../logic/selectors';

export default function(store, loadPage) {
  return () => {
    const state = store.getState();

    // determine what page is currently visible (if any)
    const pageTitle = state.getIn(['riddle', 'path', 'pages']).last(),
      pages = state.getIn(['riddle', 'pages']);

    if (pageTitle && !pages.has(pageTitle)) {
      // we need to load that page
      console.log("Triggering load for: " + pageTitle);
      store.dispatch(loadPage(pageTitle));
    }
  };
}
