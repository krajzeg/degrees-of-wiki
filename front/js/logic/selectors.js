export const riddle = state => state.get('riddle');

export function currentPage(riddle) {
  const lastPage = riddle.getIn(['path', 'pages']).last();
  if (!lastPage) return null;
  return riddle.getIn(['pages', lastPage]);
}

export function won(riddle) {
  const lastPage = riddle.getIn(['path', 'pages']).last();
  return lastPage == riddle.get('goal');
}

export function score(riddle) {
  const costs = riddle.getIn(['path', 'costs']);
  console.log(costs.toJS());
  return 2000 - costs.reduce((sum, c) => sum + c, 0);
}

export function linksClicked(riddle) {
  return riddle.getIn(['path', 'costs']).size;
}

export function linkCostFromTo(riddle, fromPage, toPage) {
  const page = riddle.getIn(['pages', fromPage]);
  if (!page) return undefined;
  const linkLocation = page.get('links').findEntry(p => p == toPage);
  if (!linkLocation) return undefined;

  const [index] = linkLocation;
  return linkCostByPosition(index);
}

export function linkCostByPosition(linkPosition) {
  const baseCost = 10 + linkPosition;
  return (baseCost > 100) ? 100 : baseCost;
}
