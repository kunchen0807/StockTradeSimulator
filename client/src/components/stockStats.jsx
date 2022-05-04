import React from 'react';
import PropTypes from 'prop-types';

function Stockstats({ stockStats }) {
  const dollarUSLocale = Intl.NumberFormat('en-US');
  return (
    <div className="stock-stats-block">
      <h2>Stats</h2>
      <h3>{stockStats.name}</h3>
      <p>
        Open:
        {' $'}
        {dollarUSLocale.format(stockStats.open)}
      </p>
      <p>
        Close:
        {' $'}
        {dollarUSLocale.format(stockStats.close)}
      </p>
      <p>
        Volume:
        {' '}
        {stockStats.volume}
      </p>
      <p>
        Percent Change:
        {' '}
        {parseFloat(stockStats.percent_change).toFixed(2)}
        %
      </p>
      <p>
        High:
        {' $'}
        {dollarUSLocale.format(stockStats.high)}
      </p>
      <p>
        Low:
        {' $'}
        {dollarUSLocale.format(stockStats.low)}
      </p>
      <p>
        52 Wk high:
        {' $'}
        {dollarUSLocale.format(stockStats.fifty_two_week.high)}
      </p>
      <p>
        52 Wk low:
        {' $'}
        {dollarUSLocale.format(stockStats.fifty_two_week.low)}
      </p>
    </div>
  );
}

Stockstats.propTypes = {
};

Stockstats.defaultProps = {

};

export default Stockstats;
