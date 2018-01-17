import { combineReducers } from 'redux';
import locations from './locations';
import baseLocation from './baseLocation';
import googleMaps from './googleMaps';
import asyncQueue from './asyncQueue';

const distanceApp = combineReducers({
  locations,
  baseLocation,
  googleMaps,
  asyncQueue,
});

export default distanceApp;
