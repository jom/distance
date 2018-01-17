const asyncQueue = (state = '', action) => {
  switch (action.type) {
    case 'SET_ASYNC_QUEUE':
      return action.queue;
    default:
      return state;
  }
};

export default asyncQueue;
