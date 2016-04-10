import {fromJS} from 'immutable';

export const reduceRiddle = action => riddle => {
  switch(action.type) {
    case 'RIDDLE_INITIALIZE':
      const {start, goal} = action;
      return fromJS({
        start, goal,
        path: {
          pages: [start],
          costs: []
        },
        pages: {}
      });

    default:
      return riddle;
  }
}
