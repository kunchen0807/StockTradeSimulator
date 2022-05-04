import React from 'react';
import PropTypes from 'prop-types';

function Stockstats({ stockStats }) {
  return (
    <div>
      <h2>Stats</h2>
      <h3>{stockStats.name}</h3>
      <p>
        Open:
        {' '}
        {stockStats.open}
      </p>
      <p>
        Volume:
        {' '}
        {stockStats.volume}
      </p>
      <p>
        High:
        {' '}
        {stockStats.high}
      </p>
      <p>
        Low:
        {' '}
        {stockStats.low}
      </p>
      <p>
        52 Wk high:
        {' '}
        {stockStats.fifty_two_week.high}
      </p>
      <p>
        52 Wk low:
        {' '}
        {stockStats.fifty_two_week.low}
      </p>
    </div>
  );
}

Stockstats.propTypes = {

};

Stockstats.defaultProps = {

};

export default Stockstats;
