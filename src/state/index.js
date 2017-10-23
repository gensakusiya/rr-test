import { combineReducers } from 'redux';

import airline from './flights/flightsReducer';

export default combineReducers({
  airline,
});
