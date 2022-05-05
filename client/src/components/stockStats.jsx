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
  stockStats: PropTypes.shape({
    name: PropTypes.string,
    open: PropTypes.string,
    close: PropTypes.string,
    volume: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    percent_change: PropTypes.string,
    fifty_two_week: PropTypes.shape({ high: PropTypes.string, low: PropTypes.string }),
  }),
};

Stockstats.defaultProps = {
  stockStats: PropTypes.shape({
    name: '',
    open: '',
    close: '',
    volume: '',
    high: '',
    low: '',
    percent_change: '',
    fifty_two_week: PropTypes.shape({ high: '', low: '' }),
  }),
};

export default Stockstats;
