import _ from 'lodash';

// Creates a subscriber for a Redux store that will trigger a
// chosen callback whenever state under a given path changes.
// This works with any Immutable.js state by using getIn().
export default function changeTrigger(store, path, callback) {
  let previousValue = store.getState().getIn(path);

  return () => {
    // should we trigger the event?
    let newValue = store.getState().getIn(path);
    if (previousValue != newValue) {
      callback(previousValue, newValue);
    }
    // either way, store the new value for reference the next time around
    previousValue = newValue;
  }
}
