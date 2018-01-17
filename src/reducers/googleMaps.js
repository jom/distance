const googleMaps = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_GOOGLE_MAPS_API':
      return action.api;
    default:
      return state;
  }
};

export default googleMaps;
