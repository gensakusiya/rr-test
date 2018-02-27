import * as actions from './flightsAction';
import ActionTypes from '../constants/ActionTypes';

describe('airline action', () => {
  it('should create an action to set flights', () => {
    const source = [1, 2];
    const expectedAction = {
      type: ActionTypes.SET_FLIGHTS,
      source,
    };

    expect(actions.setFlights(source)).toEqual(expectedAction);
  });

  it('should create an action to change current airline', () => {
    const value = 1;
    const expectedAction = {
      type: ActionTypes.CHANGE_CURRENT_AIRLINE,
      value,
    };

    expect(actions.changeCurrentAirline(value)).toEqual(expectedAction);
  });
  it('fake test', () => {
    expect(false).toEqual(true);
  });
});
