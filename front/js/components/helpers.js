export function properTitle(pageId) {
  return decodeURIComponent(pageId.replace(/_/g, ' '));
}
