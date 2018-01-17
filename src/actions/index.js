import { v4 as uuid } from 'uuid';

export const updateLocationConfig = config => {
  let rawLocations = JSON.parse(config);
  let locations = [];
  rawLocations.forEach(function(location) {
    //location.id = uuid();
    locations.push(location);
  });
  return {
    type: 'UPDATE_LOCATIONS',
    config: locations,
  };
};

export const addLocation = (name, address) => {
  return {
    type: 'ADD_LOCATION',
    id: uuid(),
    name: name,
    address: address,
    mode: 'TRANSIT',
  };
};

export const updateBaseLocation = location => {
  return {
    type: 'UPDATE_BASE_LOCATION',
    location,
  };
};

export const deleteLocation = id => {
  return {
    type: 'DELETE_LOCATION',
    id,
  };
};

export const updateGoogleMapsApi = api => {
  return {
    type: 'UPDATE_GOOGLE_MAPS_API',
    api: api,
  };
};

export const setAsyncQueue = queue => {
  return {
    type: 'SET_ASYNC_QUEUE',
    queue: queue,
  };
};
