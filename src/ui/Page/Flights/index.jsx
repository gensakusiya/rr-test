import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import {
  changeCurrentAirline,
  setFlights,
} from '../../../state/flights/flightsAction';
import List from '../../components/List';
import Select from '../../components/Select';

import Flight from './flight';

import './flights.css';

class FlightsPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    airline: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(setFlights());
  }

  handleChangeAirline = ({ key }) => {
    this.props.dispatch(changeCurrentAirline(key));
  };

  renderFlights = () => this.props.airline.get('flights').map(flight => (
    <Flight key={flight.id} data={flight} />
  ));

  render() {
    const { airline } = this.props;
    const flightsHtml = this.renderFlights();

    return (
      <div className="flights">
        <h2>Перелёты</h2>
        <div className="flights__filters">
          <Select
            options={airline.get('airlines')}
            value={airline.get('currentAirline')}
            onSelect={this.handleChangeAirline}
          />
        </div>
        <div className="flights__list">
          <List>
            { flightsHtml }
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  airline: state.airline,
});

export default connect(mapStateToProps)(FlightsPage);
