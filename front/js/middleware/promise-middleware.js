import _ from 'lodash';

export default (store) => (next) => (action) => {
  const {type, promise} = action
  if (!promise) {
    return next(action)
  }

  store.dispatch(partialAction(action, 'STARTED'));
  promise()
    .then(result => {
      store.dispatch(partialAction(action, 'RESOLVED', {result}));
    }, error => {
      store.dispatch(partialAction(action, 'FAILED', {error}));
    });
};

function partialAction(original, typeSuffix, newProperties = {}) {
  return _.extend({},
    _.omit(original, 'promise'),
    {type: `${original.type}_${typeSuffix}`},
    newProperties
  );
}
