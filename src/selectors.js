import { get } from 'lodash';

/**
 * Returns the base location.
 *
 *
 * @param {Object}  state Global state tree
 * @return {String}  Current base location.
 */

export function getBaseLocation(state) {
  return get(state, 'baseLocation', null);
}

/**
 * Returns the locations.
 *
 *
 * @param {Object}  state Global state tree
 * @return {Array}  Array of locations.
 */

export function getLocations(state) {
  return get(state, 'locations', []);
}

/**
 * Returns the location config as JSON.
 *
 *
 * @param {Object}  state Global state tree
 * @return {Array}  Array of locations.
 */

export function getLocationConfig(state) {
  let locations = [];
  state.locations.forEach(function(location) {
    locations.push({
      id: location.id,
      name: location.name,
      address: location.address,
      mode: location.mode || 'TRANSIT',
    });
  });
  return JSON.stringify(locations, null, 2);
}

/**
 * Returns the Google Maps API.
 *
 *
 * @param {Object}  state Global state tree
 * @return {Object}  Google Maps API
 */
export function getGoogleMapsApi(state) {
  return get(state, 'googleMaps', null);
}

/**
 * Returns the Async Queue
 *
 *
 * @param {Object}  state Global state tree
 * @return {Object}  Async queue
 */
export function getAsyncQueue(state) {
  return get(state, 'asyncQueue', null);
}
