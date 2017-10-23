import { Map, List, Set } from 'immutable';

import ActionTypes from '../constants/ActionTypes';

const defaultState = Map({
  source: List([]),
  flights: List([]),
  airlines: List([]),
  currentAirline: 0,
});

function AirlineReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case ActionTypes.SET_FLIGHTS: {
      let airlines = Map({
        0: 'все авиакомании',
      });

      action.source.forEach(({ carrier }) => {
        airlines = airlines.set(carrier, carrier);
      });

      return state
        .set('source', List(action.source))
        .set('flights', List(action.source))
        .set('airlines', airlines.toList())
        .set('currentAirline', 0);
    }

    case ActionTypes.CHANGE_CURRENT_AIRLINE: {
      const currentAirline = action.value;
      const airlineName = state.get('airlines').get(currentAirline);
      const flights = currentAirline === 0
        ? state.get('source')
        : state.get('source').filter(x => x.carrier === airlineName);

      return state
        .set('flights', flights)
        .set('currentAirline', currentAirline);
    }

    default: {
      return state;
    }
  }
}

export default AirlineReducer;
