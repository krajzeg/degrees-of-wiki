export const riddle = state => state.get('riddle');

export function currentPage(riddle) {
  const lastPage = riddle.get('path').last();
  if (!lastPage) return null;
  return riddle.getIn(['pages', lastPage]);
}
