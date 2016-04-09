export const riddle = state => state.get('riddle');

export function currentPage(riddle) {
  const lastPage = riddle.get('path').last();
  if (!lastPage) return null;
  return riddle.getIn(['pages', lastPage]);
}

export function score(riddle) {
  return 30000 - linksClicked(riddle) * 1000 - linksSeen(riddle);
}

export function linksClicked(riddle) {
  return riddle.get('path').size - 1;
}
export function linksSeen(riddle) {
  const clickedPages = riddle.get('path').skip(1);
  const linkCounts = clickedPages.map((page) =>
    riddle.getIn(['pages', page, 'linkCount'])
  );
  return linkCounts.reduce((sum, count) => sum + (count || 0), 0);
}
