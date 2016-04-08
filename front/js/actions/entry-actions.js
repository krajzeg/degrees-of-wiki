export default function entryActions(api) {
  return {
    // loads the entry with the given name, fetching HTML from the API
    loadEntry(title) {
      return {
        type: 'ENTRY_LOAD', title,
        promise: () => api.loadPageHTML(title),
      };
    }
  }
}
