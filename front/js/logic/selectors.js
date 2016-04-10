export const riddle = state => state.get('riddle');

export function currentPage(riddle) {
  const lastPage = riddle.getIn(['path', 'pages']).last();
  if (!lastPage) return null;
  return riddle.getIn(['pages', lastPage]);
}

export function score(riddle) {
  const costs = riddle.getIn(['path', 'costs']);
  console.log(costs.toJS());
  return 2000 - costs.reduce((sum, c) => sum + c, 0);
}

export function linksClicked(riddle) {
  return riddle.getIn(['path', 'costs']).size;
}
