const locations = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LOCATION':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          address: action.address,
          mode: action.mode || 'TRANSIT',
        },
      ];
    case 'UPDATE_LOCATIONS':
      return action.config;
    case 'DELETE_LOCATION':
      return state.filter(location => {
        return action.id !== location.id;
      });
    default:
      return state;
  }
};

export default locations;
