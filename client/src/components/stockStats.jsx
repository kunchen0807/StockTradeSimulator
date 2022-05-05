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
        {dollarUSLocale.format(parseFloat(stockStats.open).toFixed(2))}
      </p>
      <p>
        Close:
        {' $'}
        {dollarUSLocale.format(parseFloat(stockStats.close).toFixed(2))}
      </p>
      <p>
        Volume:
        {' '}
        {parseInt((stockStats.volume / 1000000), 10).toFixed(2)}
        M
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
        {dollarUSLocale.format(parseFloat(stockStats.high).toFixed(2))}
      </p>
      <p>
        Low:
        {' $'}
        {dollarUSLocale.format(parseFloat(stockStats.low).toFixed(2))}
      </p>
      <p>
        52 Wk high:
        {' $'}
        {dollarUSLocale.format(parseFloat(stockStats.fifty_two_week.high).toFixed(2))}
      </p>
      <p>
        52 Wk low:
        {' $'}
        {dollarUSLocale.format(parseFloat(stockStats.fifty_two_week.low).toFixed(2))}
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
