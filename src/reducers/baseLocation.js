const baseLocation = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_BASE_LOCATION':
      return action.location;
    default:
      return state;
  }
};

export default baseLocation;
