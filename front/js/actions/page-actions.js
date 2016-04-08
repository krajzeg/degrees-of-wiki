export default function pageActions(api) {
  return {
    // loads the page with the given name, fetching HTML from the API
    loadPage(title) {
      return {
        type: 'PAGE_LOAD', title,
        promise: () => api.loadPageHTML(title),
      };
    }
  }
}
