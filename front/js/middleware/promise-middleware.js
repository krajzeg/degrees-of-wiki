import _ from 'lodash';

export const promiseMiddleware = store => next => action => {
  const {type, promiseCall} = action
  if (!promiseCall) {
    return next(action)
  }

  store.dispatch(partialAction(action, 'STARTED'));
  promiseCall()
    .then(result => {
      store.dispatch(partialAction(action, 'RESOLVED', {result}));
    }, error => {
      store.dispatch(partialAction(action, 'FAILED', {error}));
    });
};

function partialAction(original, typeSuffix, newProperties = {}) {
  return _.extend({},
    _.omit(original, 'promiseCall'),
    {type: `${original.type}_${typeSuffix}`},
    newProperties
  );
}
