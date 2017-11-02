import { Map, List, Set } from 'immutable';

import airlineReducer from './flightsReducer';
import ActionTypes from '../constants/ActionTypes';

describe('airline reducer', () => {
  it('should return the initial state', () => {
    expect(airlineReducer()).toEqual(Map({
      source: List([]),
      flights: List([]),
      airlines: List([]),
      currentAirline: 0,
    }));
  });

  it('should return the list of airlines', () => {
    const currentState = airlineReducer(undefined, {
      type: ActionTypes.SET_FLIGHTS,
      source: [
        {
          id: 123,
          direction: {
            from: 'Moscow',
            to: 'Berlin',
          },
          arrival: '2016-06-08T19:52:27.979Z',
          departure: '2016-06-08T17:51:20.979Z',
          carrier: 'S7',
        },
        {
          id: 193,
          direction: {
            from: 'Moscow',
            to: 'New York',
          },
          arrival: '2016-06-08T21:52:27.979Z',
          departure: '2016-06-08T17:51:20.979Z',
          carrier: 'KLM',
        },
      ],
    });

    expect(currentState.get('airlines')).toEqual(List(['все авиакомании', 'S7', 'KLM']));
  });

  it('should return the list of uniq airlines', () => {
    const currentState = airlineReducer(undefined, {
      type: ActionTypes.SET_FLIGHTS,
      source: [
        {
          id: 123,
          direction: {
            from: 'Moscow',
            to: 'Berlin',
          },
          arrival: '2016-06-08T19:52:27.979Z',
          departure: '2016-06-08T17:51:20.979Z',
          carrier: 'S7',
        },
        {
          id: 193,
          direction: {
            from: 'Moscow',
            to: 'New York',
          },
          arrival: '2016-06-08T21:52:27.979Z',
          departure: '2016-06-08T17:51:20.979Z',
          carrier: 'KLM',
        },
        {
          id: 193,
          direction: {
            from: 'Moscow',
            to: 'New York',
          },
          arrival: '2016-06-08T21:52:27.979Z',
          departure: '2016-06-08T17:51:20.979Z',
          carrier: 'KLM',
        },
      ],
    });

    expect(currentState.get('airlines')).toEqual(List(['все авиакомании', 'S7', 'KLM']));
  });

  it('should return default airlines item', () => {
    const currentState = airlineReducer(undefined, {
      type: ActionTypes.SET_FLIGHTS,
      source: [
        {
          id: 123,
          direction: {
            from: 'Moscow',
            to: 'Berlin',
          },
          arrival: '2016-06-08T19:52:27.979Z',
          departure: '2016-06-08T17:51:20.979Z',
          carrier: 'S7',
        },
      ],
    });
    const airlines = currentState.get('airlines');

    expect(airlines.get(0)).toEqual('все авиакомании');
    expect(airlines.get(1)).toEqual('S7');
  });

  it('should return new value currentAirline selector', () => {
    const currentState = airlineReducer(Map({
      source: List([]),
      flights: List([]),
      airlines: List([]),
      currentAirline: 0,
    }), {
      type: ActionTypes.CHANGE_CURRENT_AIRLINE,
      value: 1,
    });

    expect(currentState.get('currentAirline')).toEqual(1);
  });

  it('should return a list filtered by the current airline', () => {
    const source = List([
      {
        id: 123,
        direction: {
          from: 'Moscow',
          to: 'Berlin',
        },
        arrival: '2016-06-08T19:52:27.979Z',
        departure: '2016-06-08T17:51:20.979Z',
        carrier: 'S7',
      },
      {
        id: 193,
        direction: {
          from: 'Moscow',
          to: 'New York',
        },
        arrival: '2016-06-08T21:52:27.979Z',
        departure: '2016-06-08T17:51:20.979Z',
        carrier: 'Aeroflot',
      },
      {
        id: 133,
        direction: {
          from: 'Moscow',
          to: 'Samara',
        },
        arrival: '2016-09-08T13:52:27.979Z',
        departure: '2016-08-08T17:51:20.979Z',
        carrier: 'KLM',
      },
      {
        id: 126,
        direction: {
          from: 'Moscow',
          to: 'London',
        },
        arrival: '2016-08-10T13:52:27.979Z',
        departure: '2016-08-09T17:51:20.979Z',
        carrier: 'S7',
      },
    ]);

    let currentState = airlineReducer(undefined, {
      type: ActionTypes.SET_FLIGHTS,
      source,
    });
    currentState = airlineReducer(currentState, {
      type: ActionTypes.CHANGE_CURRENT_AIRLINE,
      value: 1,
    });

    const currentAirline = currentState.get('airlines').toArray()[1];

    expect(currentState.get('flights')).toEqual(source.filter(x => x.carrier === currentAirline));
  });

  it('should return all flights if airline select value equal 0', () => {
    const source = List([
      {
        id: 123,
        direction: {
          from: 'Moscow',
          to: 'Berlin',
        },
        arrival: '2016-06-08T19:52:27.979Z',
        departure: '2016-06-08T17:51:20.979Z',
        carrier: 'S7',
      },
      {
        id: 193,
        direction: {
          from: 'Moscow',
          to: 'New York',
        },
        arrival: '2016-06-08T21:52:27.979Z',
        departure: '2016-06-08T17:51:20.979Z',
        carrier: 'Aeroflot',
      },
      {
        id: 133,
        direction: {
          from: 'Moscow',
          to: 'Samara',
        },
        arrival: '2016-09-08T13:52:27.979Z',
        departure: '2016-08-08T17:51:20.979Z',
        carrier: 'KLM',
      },
      {
        id: 126,
        direction: {
          from: 'Moscow',
          to: 'London',
        },
        arrival: '2016-08-10T13:52:27.979Z',
        departure: '2016-08-09T17:51:20.979Z',
        carrier: 'S7',
      },
    ]);

    let currentState = airlineReducer(undefined, {
      type: ActionTypes.SET_FLIGHTS,
      source,
    });
    currentState = airlineReducer(currentState, {
      type: ActionTypes.CHANGE_CURRENT_AIRLINE,
      value: 1,
    });
    currentState = airlineReducer(currentState, {
      type: ActionTypes.CHANGE_CURRENT_AIRLINE,
      value: 0,
    });

    expect(currentState.get('flights')).toEqual(source);
  });
});
