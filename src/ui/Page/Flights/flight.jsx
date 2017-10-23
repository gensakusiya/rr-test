import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const getTime = (date) => {
  if (typeof date === 'string') {
    const mDate = moment(date);
    return mDate.isValid()
      ? mDate.format('HH:mm')
      : '';
  }

  return '';
};

const flight = ({ data }) => (
  <div className="flight">
    <div className="flight__carrier">
      { data.carrier }
    </div>
    <div className="flight__info">
      <div className="flight__info__part">
        <div className="flight__info__name">
          { data.direction.from }
        </div>
        <div className="flight__info__time">
          { getTime(data.departure) }
        </div>
      </div>
      <div className="flight__info__part">
        <div className="flight__info__name">
          { data.direction.to }
        </div>
        <div className="flight__info__time">
          { getTime(data.arrival) }
        </div>
      </div>
    </div>
  </div>
);

flight.propTypes = {
  data: PropTypes.object.isRequired,
};

export default flight;
