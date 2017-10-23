import ActionTypes from '../constants/ActionTypes';

import FAKE_DATA from './data.json';

export function setFlights(source = FAKE_DATA.flights) {
  return {
    type: ActionTypes.SET_FLIGHTS,
    source,
  };
}

export function changeCurrentAirline(value) {
  return {
    type: ActionTypes.CHANGE_CURRENT_AIRLINE,
    value,
  };
}
