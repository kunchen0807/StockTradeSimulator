import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts';

function StockOverivew({
  stockData, todayView, monthlyView, yearlyView, currentPrice,
}) {
  const dollarUSLocale = Intl.NumberFormat('en-US');
  const datas = [];
  stockData.values.forEach((data) => {
    datas.push({ time: data.datetime, price: data.close });
  });
  datas.reverse();
  let interval = '';
  if (stockData.meta.interval === '1day') {
    interval = 'Past 30 Days';
  } else if (stockData.meta.interval === '1week') {
    interval = 'Past 52 Weeks';
  } else if (stockData.meta.interval === '15min') {
    interval = 'Today';
  }
  return (
    <div className="stock_overview">
      <h2>{stockData.meta.symbol}</h2>
      <h3>
        Current Price:
        {' $'}
        {dollarUSLocale.format(currentPrice)}
      </h3>
      <div className="intervel-change-button">
        <button type="submit" onClick={() => todayView()}>1D</button>
        <button type="submit" onClick={() => monthlyView()}>1M</button>
        <button type="submit" onClick={() => yearlyView()}>1Y</button>
      </div>
      <h3>{interval}</h3>
      <div className="chart">
        <LineChart
          width={1000}
          height={500}
          data={datas}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="basic" dataKey="price" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
}

StockOverivew.propTypes = {
  todayView: PropTypes.func,
  monthlyView: PropTypes.func,
  yearlyView: PropTypes.func,
  currentPrice: PropTypes.number,
  stockData: PropTypes.shape({
    meta: PropTypes.shape({
      symbol: PropTypes.string,
      interval: PropTypes.string,
      currency: PropTypes.string,
      exchange_timezone: PropTypes.string,
      exchange: PropTypes.string,
      type: PropTypes.string,
    }),
    values: PropTypes.shape([{
      datetime: PropTypes.string,
      open: PropTypes.string,
      high: PropTypes.string,
      low: PropTypes.string,
      close: PropTypes.string,
      volume: PropTypes.string,
    }]),
  }),
};

StockOverivew.defaultProps = {
  todayView: () => {},
  monthlyView: () => {},
  yearlyView: () => {},
  currentPrice: 0,
  stockData: {
    meta: {
      symbol: '',
      interval: '',
      currency: '',
      exchange_timezone: '',
      exchange: '',
      type: '',
    },
    values: [{
      datetime: '',
      open: '',
      high: '',
      low: '',
      close: '',
      volume: '',
    }],
  },
};

export default StockOverivew;
