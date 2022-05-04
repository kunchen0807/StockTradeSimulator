import React from 'react';
import PropTypes from 'prop-types';

function StockNews({ stockNews, trendingStocks }) {
  return (
    <div>
      <h2>Today&apos;s Popular Finance News</h2>
      <div className="stock_news">
        {stockNews.map((news) => (
          <h3 key={news.title}>
            <a href={news.link}>
              {news.title}
            </a>
          </h3>
        ))}
      </div>
      <div>
        <h1>Top 20 Trending Stocks</h1>
        {trendingStocks.map((stock, index) => (
          <p key={stock.symbol}>
            {index + 1}
            .
            {' '}
            {stock.symbol}
          </p>
        ))}
      </div>
    </div>
  );
}

StockNews.propTypes = {

};

StockNews.defaultProps = {

};

export default StockNews;
