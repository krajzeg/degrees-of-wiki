export default function riddleActions() {
  return {
    initializeRiddle(start, goal) { return {type: 'RIDDLE_INITIALIZE', start, goal}; }
  };
}
