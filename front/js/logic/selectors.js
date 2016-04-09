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
  const {path, start, goal} = riddle.toObject();

  const linkCounts = path.map((title) => {
    if (title == start || title == goal) {
      // the start and goal page don't count against you
      return 0;
    } else {
      // all other pages count
      return riddle.getIn(['pages', title, 'linkCount']) || 0;
    }
  });

  return linkCounts.reduce((sum, count) => sum + count, 0);
}
