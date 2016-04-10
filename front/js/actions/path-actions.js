export default function pathActions() {
  return {
    goTo(page, cost) { return {type: 'PATH_GO_TO', page, cost} },
    goBackTo(page) { return {type: 'PATH_GO_BACK_TO', page}; }
  };
}
