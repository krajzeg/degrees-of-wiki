export default function pathActions() {
  return {
    goTo(page) { return {type: 'PATH_GO_TO', page} },
    goBackTo(page) { return {type: 'PATH_GO_BACK_TO', page}; }
  };
}
