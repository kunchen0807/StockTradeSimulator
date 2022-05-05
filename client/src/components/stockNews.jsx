import React from 'react';
import PropTypes from 'prop-types';

function StockNews({ stockNews, trendingStocks }) {
  return (
    <div className="trending-stock-and-news">
      <div className="news-blocks">
        <h2 className="news-title">News Today</h2>
        <div className="stock_news">
          {stockNews.map((news) => (
            <h3 key={news.title}>
              <a href={news.link}>
                {news.title}
              </a>
            </h3>
          ))}
        </div>
      </div>
      <div className="news-blocks">
        <h2 className="trending-stock-title">Top 20 Trending Stocks</h2>
        <div className="trending-stock">
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
    </div>
  );
}

StockNews.propTypes = {
  stockNews: PropTypes.arrayOf(PropTypes.shape({})),
  trendingStocks: PropTypes.arrayOf(PropTypes.shape({})),
};

StockNews.defaultProps = {
  stockNews: [{}],
  trendingStocks: [{}],
};

export default StockNews;
